CREATE TABLE tray_tokens (
  store_id TEXT PRIMARY KEY NOT NULL,
  encrypted TEXT NOT NULL,
  lock_until INTEGER NOT NULL DEFAULT 0
);
