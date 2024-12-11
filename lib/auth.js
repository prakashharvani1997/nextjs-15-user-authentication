import { cookies } from "next/headers";

const { BetterSqlite3Adapter } = require("@lucia-auth/adapter-sqlite");
const { Lucia } = require("lucia");

const adapter = new BetterSqlite3Adapter(db,{user : 'users' , session:'Sessions'})

const lucia = new Lucia(adapter,{
    sessionCookie:{
        expires:false,
        attributes: { 
            secure:process.env.NODE_ENV == 'production';
        }
    }
})

export async function createAuthSession(userId) {

    const session = lucia.createSession(userId,{});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies()
}