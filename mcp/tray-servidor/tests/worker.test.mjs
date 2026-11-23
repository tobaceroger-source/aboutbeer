import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFile} from 'node:fs/promises';
import worker,{encryptTokens,decryptTokens,sanitizeOrder} from '../worker/index.js';

const migration=await readFile(new URL('../drizzle/0000_tray_tokens.sql',import.meta.url),'utf8');
export function database() {
  const sqlite=new DatabaseSync(':memory:');sqlite.exec(migration);
  return {prepare(sql) {return {bind(...args) {return {
    async first(){return sqlite.prepare(sql).get(...args)||null;},
    async run(){return {meta:{changes:sqlite.prepare(sql).run(...args).changes}};}
  };}};}};
}
function env(seed={}) {return {DB:database(),STORE_ID:'1501140',TRAY_API_ADDRESS:'https://lojatesteintegracaotray01.corpsuite.com.br/web_api',TOKEN_ENCRYPTION_KEY:Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString('base64'),TRAY_BOOTSTRAP_TOKENS:JSON.stringify({store_id:'1501140',api_host:'https://lojatesteintegracaotray01.corpsuite.com.br/web_api',access_token:'test-access',refresh_token:'test-refresh',date_expiration_access_token:'2099-01-01 00:00:00',...seed})};}
function rpc(name,args={},signed=true){return new Request('https://private.example/mcp',{method:'POST',headers:{'content-type':'application/json',...(signed?{'oai-authenticated-user-id':'test-user'}:{})},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name,arguments:args}})});}

test('anonymous calls cannot read data or touch the database',async()=>{
  const response=await worker.fetch(rpc('tray_connection_status',{},false),{});
  assert.equal(response.status,401);
});
test('discovery contains only three read-only tools and no private credentials',async()=>{
  const request=new Request('https://private.example/mcp',{method:'POST',body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/list'})});
  const data=await (await worker.fetch(request,{})).json();
  assert.equal(data.result.tools.length,3);
  assert.ok(data.result.tools.every(t=>t.annotations.readOnlyHint));
  assert.ok(!JSON.stringify(data).includes('test-access'));
});
test('AES-GCM protects persisted tokens and detects tampering',async()=>{
  const config=env(), tokens={access_token:'sensitive-test'};
  const encrypted=await encryptTokens(config,tokens);
  assert.ok(!encrypted.includes(tokens.access_token));
  assert.deepEqual(await decryptTokens(config,encrypted),tokens);
  const parts=encrypted.split('.');const bytes=Buffer.from(parts[1],'base64');bytes[0]^=1;
  await assert.rejects(decryptTokens(config,parts[0]+'.'+bytes.toString('base64')));
});
test('rejects invalid dates, missing period bounds, arbitrary hosts and write tools',async()=>{
  for(const [name,args] of [['tray_list_orders',{limit:51}],['tray_list_orders',{date_from:'2026-02-30',date_to:'2026-03-01'}],['tray_list_orders',{date_from:'2026-01-01'}],['tray_list_orders',{url:'https://attacker.example'}],['tray_get_order',{id:'1/complete'}],['tray_delete_order',{id:1}]]) {
    const data=await(await worker.fetch(rpc(name,args),{})).json();
    assert.equal(data.result.isError,true);
  }
});
test('returns bounded analytics fields, including paid flag, without PII or access codes',async()=>{
  const clean=sanitizeOrder({id:'1',total:'20.00',has_payment:'1',access_code:'secret',session_id:'secret-session',customer_id:'7',Customer:{email:'private@example'},OrderStatus:{id:'1',status:'PAGO',type:'open',extra:'hidden'}});
  assert.deepEqual(clean,{id:'1',total:'20.00',has_payment:'1',OrderStatus:{id:'1',status:'PAGO',type:'open'}});
});
test('dates and paid filter are sent to the fixed API; secrets stay out of the response',async()=>{
  const original=globalThis.fetch;const config=env();let actual;
  globalThis.fetch=async(url,options)=>{actual=new URL(url);assert.equal(options.method,'GET');return Response.json({paging:{total:2,page:1,limit:10},Orders:[{Order:{id:'5',total:'20.00',access_code:'secret-code'}}]});};
  try{
    const response=await worker.fetch(rpc('tray_list_orders',{date_from:'2026-01-01',date_to:'2026-01-31',has_payment:1,limit:10}),config);
    const text=await response.text();const data=JSON.parse(text).result.structuredContent;
    assert.equal(actual.origin,'https://lojatesteintegracaotray01.corpsuite.com.br');
    assert.equal(actual.searchParams.get('date'),'2026-01-01,2026-01-31 23:59:59');
    assert.equal(actual.searchParams.get('has_payment'),'1');assert.equal(data.paging.total,2);
    assert.ok(!text.includes('test-access'));assert.ok(!text.includes('secret-code'));
  }finally{globalThis.fetch=original;}
});
test('expired access is refreshed once and encrypted replacement survives the next call',async()=>{
  const original=globalThis.fetch;const config=env({date_expiration_access_token:'2000-01-01 00:00:00'});let refreshes=0;
  globalThis.fetch=async url=>{const parsed=new URL(url);if(parsed.pathname.endsWith('/auth')){refreshes++;assert.equal(parsed.searchParams.get('refresh_token'),'test-refresh');return Response.json({store_id:'1501140',api_host:config.TRAY_API_ADDRESS,access_token:'replacement-access',refresh_token:'replacement-refresh',date_expiration_access_token:'2099-01-01 00:00:00'});}
    assert.equal(parsed.searchParams.get('access_token'),'replacement-access');return Response.json({paging:{total:646}});};
  try{
    for(let i=0;i<2;i++){const data=await(await worker.fetch(rpc('tray_connection_status'),config)).json();assert.equal(data.result.isError,false);assert.equal(data.result.structuredContent.total_test_orders,646);}
    assert.equal(refreshes,1);
    const row=await config.DB.prepare('SELECT encrypted FROM tray_tokens WHERE store_id = ?').bind('1501140').first();
    assert.ok(!row.encrypted.includes('replacement-access'));
  }finally{globalThis.fetch=original;}
});
test('cross-origin requests fail before tool execution',async()=>{
  const req=rpc('tray_connection_status');req.headers.set('origin','https://attacker.example');
  assert.equal((await worker.fetch(req,{})).status,403);
});
test('redirects are blocked without forwarding credentials to a different host',async()=>{
  const original=globalThis.fetch;let calls=0;
  globalThis.fetch=async(url,options)=>{calls++;assert.equal(options.redirect,'manual');return new Response(null,{status:302,headers:{location:'https://attacker.example'}});};
  try{const data=await(await worker.fetch(rpc('tray_connection_status'),env())).json();assert.equal(data.result.isError,true);assert.equal(calls,1);}
  finally{globalThis.fetch=original;}
});
