import { Low, JSONFile} from "lowdb";

const adapter = new JSONFile("db.json")
const db = new Low(adapter)

await db.read()

db.data = db.data || {}
db.data.posts = db.data.posts || []

export default db