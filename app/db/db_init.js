/** @param {import('bun:sqlite').Database} db */
export default function db_init(db) {
    db.run(`
      CREATE TABLE IF NOT EXISTS product (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        active INTEGER DEFAULT 0
      )
    `)
  }