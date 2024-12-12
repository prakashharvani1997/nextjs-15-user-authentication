import { cookies } from "next/headers";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";
import db from "./db";


const adapter = new BetterSqlite3Adapter(db, { user: 'users', session: 'Sessions' })

const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV == 'production'
        }
    }
})

export async function createAuthSession(userId) {

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}


export async function verifyAuth() {


    const sessionCookie = cookies().get(lucia.sessionCookieName);

    if (!sessionCookie) {
        return {
            user: null,
            session: null
        }
    }

    const sessionId = sessionCookie.value;

    if (!sessionId) {
        return {
            user: null,
            session: null
        }
    }

    const res = await lucia.validateSession(sessionId);
    try {

        if (res.session && res.session.fresh) {
            const sessionCookie = lucia.createSessionCookie(res.session.id)
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        }

        if (!res.session) {
            const sessionCookie = lucia.createBlankSessionCookie();
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

        }

    } catch (error) {

    }
    return res;
}

export async function destroySession() {

    const {session} = await verifyAuth();
    if(!session){
        return {
            error:'Unauthorized'
        }
    }

    lucia.invalidateSession(session.id)
    

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    
}