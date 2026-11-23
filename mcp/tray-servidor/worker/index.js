const STORE = '1501140';
const API = 'https://lojatesteintegracaotray01.corpsuite.com.br/web_api';
const annotations = {readOnlyHint:true, destructiveHint:false, idempotentHint:true, openWorldHint:true};
const schema = properties => ({type:'object',properties,additionalProperties:false});
const tools = [
  {name:'tray_connection_status',description:'Verifica acesso à loja de TESTES 1501140. Não representa vendas reais da About Beer.',inputSchema:schema({}),annotations},
  {name:'tray_list_orders',description:'Consulta pedidos de TESTES por página e filtros. Totais em BRL são strings decimais. Não confundir pedido criado ou payment_date com receita paga; conferir has_payment e status. Para períodos completos, percorrer todas as páginas.',inputSchema:schema({
    page:{type:'integer',minimum:1,maximum:10000,default:1},limit:{type:'integer',minimum:1,maximum:50,default:30},
    date_from:{type:'string',pattern:'^\\d{4}-\\d{2}-\\d{2}$'},date_to:{type:'string',pattern:'^\\d{4}-\\d{2}-\\d{2}$'},
    status:{type:'string',minLength:1,maxLength:80},has_payment:{type:'integer',enum:[0,1]}
  }),annotations},
  {name:'tray_get_order',description:'Consulta um pedido da loja de TESTES, com campos de venda e pagamento, sem dados pessoais ou códigos de acesso do cliente.',inputSchema:{...schema({id:{type:'integer',minimum:1,maximum:2147483647}}),required:['id']},annotations}
];
const pick = (value, keys) => Object.fromEntries(keys.filter(k=>value?.[k] !== undefined && (typeof value[k] !== 'object' || value[k] === null)).map(k=>[k,value[k]]));
const orderFields = ['id','date','modified','status','partial_total','taxes','discount','total','shipment_value','payment_form','payment_date','has_payment','has_shipment','has_invoice','point_sale','discount_coupon'];
export function sanitizeOrder(order) {
  const clean = pick(order,orderFields);
  if(order?.OrderStatus) clean.OrderStatus=pick(order.OrderStatus,['id','status','type']);
  return clean;
}
function validateArgs(name,args) {
  if(!args || typeof args !== 'object' || Array.isArray(args)) throw new Error('Argumentos inválidos.');
  const tool=tools.find(t=>t.name===name);
  if(!tool) throw new Error('Ferramenta desconhecida.');
  if(Object.keys(args).some(k=>!Object.hasOwn(tool.inputSchema.properties,k))) throw new Error('Parâmetro não permitido.');
  for(const key of tool.inputSchema.required||[]) if(args[key]===undefined) throw new Error('Parâmetro obrigatório: '+key);
  for(const [key,value] of Object.entries(args)) {
    const rule=tool.inputSchema.properties[key];
    if(rule.type==='integer' && (!Number.isInteger(value) || value<(rule.minimum??0) || value>(rule.maximum??2147483647) || (rule.enum&&!rule.enum.includes(value)))) throw new Error('Parâmetro inválido: '+key);
    if(rule.type==='string' && (typeof value!=='string' || value.length<(rule.minLength??0) || value.length>(rule.maxLength??80) || (rule.pattern&&!new RegExp(rule.pattern).test(value)))) throw new Error('Parâmetro inválido: '+key);
    if(key.startsWith('date_') && (!Number.isFinite(Date.parse(value+'T00:00:00Z')) || new Date(value+'T00:00:00Z').toISOString().slice(0,10)!==value)) throw new Error('Data inválida.');
  }
  if(Boolean(args.date_from)!==Boolean(args.date_to) || (args.date_from&&args.date_from>args.date_to)) throw new Error('Informe início e fim válidos do período.');
}
const encode = bytes => btoa(String.fromCharCode(...bytes));
const decode = text => Uint8Array.from(atob(text), c=>c.charCodeAt(0));
async function cryptKey(env) {return crypto.subtle.importKey('raw',decode(env.TOKEN_ENCRYPTION_KEY),'AES-GCM',false,['encrypt','decrypt']);}
export async function encryptTokens(env,value) {
  const iv=crypto.getRandomValues(new Uint8Array(12));
  const encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:new TextEncoder().encode(STORE)},await cryptKey(env),new TextEncoder().encode(JSON.stringify(value)));
  return encode(iv)+'.'+encode(new Uint8Array(encrypted));
}
export async function decryptTokens(env,value) {
  const [iv,data]=value.split('.');
  return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:decode(iv),additionalData:new TextEncoder().encode(STORE)},await cryptKey(env),decode(data))));
}
function checkConfig(env) {
  if(env.STORE_ID!==STORE || env.TRAY_API_ADDRESS!==API || !env.DB || !env.TOKEN_ENCRYPTION_KEY) throw new Error('Configuração da loja indisponível.');
}
function checkTokens(tokens) {
  if(!tokens || String(tokens.store_id)!==STORE || tokens.api_host!==API || !tokens.access_token || !tokens.refresh_token || !tokens.date_expiration_access_token) throw new Error('Credenciais incompatíveis com a loja de testes.');
  return tokens;
}
async function readTokens(env) {
  checkConfig(env);
  let row=await env.DB.prepare('SELECT encrypted FROM tray_tokens WHERE store_id = ?').bind(STORE).first();
  if(!row) {
    const seed=checkTokens(JSON.parse(env.TRAY_BOOTSTRAP_TOKENS||'null'));
    await env.DB.prepare('INSERT OR IGNORE INTO tray_tokens (store_id, encrypted) VALUES (?, ?)').bind(STORE,await encryptTokens(env,seed)).run();
    row=await env.DB.prepare('SELECT encrypted FROM tray_tokens WHERE store_id = ?').bind(STORE).first();
  }
  return checkTokens(await decryptTokens(env,row.encrypted));
}
const expires = tokens => Date.parse(tokens.date_expiration_access_token.replace(' ','T')+'-03:00');
async function trayFetch(path,query={}) {
  const url=new URL(API+path);
  for(const [key,value] of Object.entries(query)) url.searchParams.set(key,String(value));
  let response;
  try {response=await fetch(url,{method:'GET',redirect:'manual',signal:AbortSignal.timeout(20000)});}
  catch(error) {
    let detail=String(error.message||error.name||'network error').replace(/https?:\/\/\S+/g,'[URL]');
    for(const value of Object.values(query)) if(String(value).length>10) detail=detail.split(String(value)).join('[redacted]');
    console.error('Tray fetch failure',String(error.name),detail.slice(0,240));
    throw new Error('A Tray não respondeu. Tente novamente.');
  }
  if(response.status>=300 && response.status<400) throw new Error('Redirecionamento inesperado da Tray.');
  let data;
  try {data=await response.json();} catch {throw new Error('Resposta inválida da Tray.');}
  if(!response.ok || (data.code && Number(data.code)>=400)) {
    const error=new Error('Falha na consulta à Tray (HTTP '+response.status+').');
    error.expired=response.status===401 || Number(data.code)===1000;
    throw error;
  }
  return data;
}
async function refreshTokens(env,previous) {
  const deadline=Date.now()+30000;
  const lock=await env.DB.prepare('UPDATE tray_tokens SET lock_until = ? WHERE store_id = ? AND lock_until < ?').bind(deadline,STORE,Date.now()).run();
  if(lock.meta.changes!==1) throw new Error('Renovação em andamento. Tente novamente em alguns segundos.');
  try {
    const current=await readTokens(env);
    if(current.access_token!==previous.access_token) return current;
    const next=checkTokens(await trayFetch('/auth',{refresh_token:current.refresh_token}));
    const saved=await env.DB.prepare('UPDATE tray_tokens SET encrypted = ?, lock_until = 0 WHERE store_id = ? AND lock_until = ?').bind(await encryptTokens(env,next),STORE,deadline).run();
    if(saved.meta.changes!==1) throw new Error('Renovação não pôde ser salva.');
    return next;
  } finally {
    await env.DB.prepare('UPDATE tray_tokens SET lock_until = 0 WHERE store_id = ? AND lock_until = ?').bind(STORE,deadline).run();
  }
}
async function authorizedGet(env,path,query={}) {
  let token=await readTokens(env);
  if(!Number.isFinite(expires(token)) || expires(token)<Date.now()+300000) token=await refreshTokens(env,token);
  try {return await trayFetch(path,{...query,access_token:token.access_token});}
  catch(error) {
    if(!error.expired) throw error;
    token=await refreshTokens(env,token);
    return trayFetch(path,{...query,access_token:token.access_token});
  }
}
async function execute(name,args,env) {
  validateArgs(name,args);
  const context={store_id:STORE,environment:'test',currency:'BRL'};
  if(name==='tray_connection_status') {
    const response=await authorizedGet(env,'/orders',{limit:1});
    const tokens=await readTokens(env);
    return {...context,connected:true,total_test_orders:response.paging.total,access_expires_at:tokens.date_expiration_access_token};
  }
  if(name==='tray_get_order') {
    const data=await authorizedGet(env,'/orders/'+args.id);
    if(!data.Order) throw new Error('Pedido não encontrado.');
    return {...context,order:sanitizeOrder(data.Order)};
  }
  const query={page:args.page??1,limit:args.limit??30,sort:'id_desc'};
  if(args.date_from) query.date=args.date_from+','+args.date_to+' 23:59:59';
  if(args.status!==undefined) query.status=args.status;
  if(args.has_payment!==undefined) query.has_payment=args.has_payment;
  const data=await authorizedGet(env,'/orders',query);
  if(!Array.isArray(data.Orders)||!data.paging) throw new Error('Resposta de pedidos inválida.');
  return {...context,paging:pick(data.paging,['total','page','offset','limit','maxLimit']),filters:args,orders:data.Orders.map(o=>sanitizeOrder(o.Order))};
}
function json(body,status=200) {return Response.json(body,{status,headers:{'cache-control':'no-store','x-content-type-options':'nosniff'}});}
const page = `<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>About Beer Analytics — Tray</title><style>body{margin:0;background:#f5f4ef;color:#1c3028;font:17px system-ui}main{max-width:640px;margin:10vh auto;padding:32px}small{color:#63736a}h1{font-size:36px}li{margin:12px 0}button,a{color:#1e6148}button{border:0;background:#1e6148;color:white;padding:13px 20px;border-radius:8px;font:inherit;cursor:pointer}#status{padding:16px;background:white;border-radius:8px;white-space:pre-wrap}</style><main><small>INTEGRAÇÃO PRIVADA · SOMENTE CONSULTA</small><h1>About Beer Analytics</h1><p>Conexão com a loja de testes Tray <strong>1501140</strong>.</p><ul><li>Verificar o acesso à API</li><li>Consultar pedidos, valores e status de pagamento</li><li>Filtrar por período e percorrer páginas</li></ul><p>Instale o plugin privado provisionado pelo Sites na sua conta para usar as consultas no ChatGPT e no Codex.</p><button id="check">Verificar conexão</button><p id="status">Os pedidos desta loja são dados de teste.</p><p><a href="/signin-with-chatgpt?returnTo=%2F" target="_top">Entrar com ChatGPT</a></p></main><script>document.querySelector('#check').onclick=async()=>{const el=document.querySelector('#status');el.textContent='Verificando…';try{const r=await fetch('/api/status');const d=await r.json();el.textContent=r.ok?'API conectada. Loja de testes: '+d.store_id+'. Pedidos disponíveis: '+d.total_test_orders+'.':d.error;}catch{el.textContent='Não foi possível verificar a conexão.'}};</script></html>`;
export default {async fetch(request,env) {
  const path=new URL(request.url).pathname;
  const origin=request.headers.get('origin');
  if(origin && origin!==new URL(request.url).origin) return json({error:'Origem não permitida.'},403);
  if(path==='/'&&request.method==='GET') return new Response(page,{headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','content-security-policy':"default-src 'self'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; frame-ancestors 'self' https://chatgpt.com https://chat.openai.com"}});
  if(path==='/health'&&request.method==='GET') return json({ok:true,service:'About Beer Analytics',environment:'test'});
  if(path==='/api/status'&&request.method==='GET') {
    if(!request.headers.get('oai-authenticated-user-id')) return json({error:'Entre com sua conta ChatGPT.'},401);
    try {return json(await execute('tray_connection_status',{},env));} catch {return json({error:'Conexão indisponível. Verifique a configuração e a validade da autorização Tray.'},502);}
  }
  if(path!=='/mcp') return json({error:'Página não encontrada.'},404);
  if(request.method!=='POST') return new Response(null,{status:405,headers:{allow:'POST'}});
  if(Number(request.headers.get('content-length')||0)>16384) return json({error:'Pedido muito grande.'},413);
  let message;
  try {const raw=await request.text();if(raw.length>16384) return json({error:'Pedido muito grande.'},413);message=JSON.parse(raw);} catch {return json({jsonrpc:'2.0',id:null,error:{code:-32700,message:'JSON inválido.'}},400);}
  if(!message || typeof message!=='object' || Array.isArray(message) || message.jsonrpc!=='2.0' || typeof message.method!=='string') return json({jsonrpc:'2.0',id:null,error:{code:-32600,message:'Requisição inválida.'}},400);
  const id=message.id??null;
  const result=value=>json({jsonrpc:'2.0',id,result:value});
  if(message.method==='initialize') return result({protocolVersion:['2024-11-05','2025-03-26','2025-06-18'].includes(message.params?.protocolVersion)?message.params.protocolVersion:'2025-06-18',capabilities:{tools:{listChanged:false}},serverInfo:{name:'aboutbeer-tray-analytics',version:'1.0.0'},instructions:'Somente consulta à loja de TESTES 1501140. Dados não representam vendas reais da About Beer. Não há ferramentas de escrita.'});
  if(message.method==='notifications/initialized') return new Response(null,{status:202});
  if(message.method==='ping') return result({});
  if(message.method==='tools/list') return result({tools});
  if(message.method!=='tools/call') return json({jsonrpc:'2.0',id,error:{code:-32601,message:'Método desconhecido.'}});
  if(!request.headers.get('oai-authenticated-user-id')) return json({jsonrpc:'2.0',id,error:{code:-32001,message:'Autenticação ChatGPT necessária.'}},401);
  try {
    const data=await execute(message.params?.name,message.params?.arguments??{},env);
    return result({content:[{type:'text',text:JSON.stringify(data)}],structuredContent:data,isError:false});
  } catch(error) {
    const safe=/^(Argumentos|Ferramenta|Parâmetro|Data inválida|Informe início|Renovação|A Tray|Falha na consulta|Pedido não encontrado|Resposta de pedidos)/.test(error.message)?error.message:'Não foi possível consultar a loja. Verifique a autorização e tente novamente.';
    return result({content:[{type:'text',text:safe}],isError:true});
  }
}};
