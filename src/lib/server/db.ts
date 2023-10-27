import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('auth.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)");
});

export default db;
