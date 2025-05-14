import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const defaultData = { entries: [] }
const adapter = new JSONFile('db.json')
const db = new Low(adapter, defaultData)

await db.read()

export default db 