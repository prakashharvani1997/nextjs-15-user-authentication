import db from "./db"


export function createUser(email,password) {

    const res =  db.prepare('Insert into users (email,password) values (?,?)').run(email,password)
    return res.lastInsertRowid
}



export function getUserByEmail(email) {

  return db.prepare('Select * from users where email = ? ').get(email)
}