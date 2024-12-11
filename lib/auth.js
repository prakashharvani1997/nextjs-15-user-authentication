const { BetterSqlite3Adapter } = require("@lucia-auth/adapter-sqlite");
const { Lucia } = require("lucia");

const adapter = new BetterSqlite3Adapter(db,{user : 'users' , session:'Sessions'})

const lucia = new Lucia