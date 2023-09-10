import { Database } from 'bun:sqlite'

import db_init from './db_init'

const db = new Database('db.sqlite', { create: true })

db_init(db)
console.log("Start Server ")
export default db