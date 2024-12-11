

export function createUser(email,password) {

    const res =  db.prepate('Insert into users (email,password) values (?,?)').run(email,password)
    return res.lastInsertRowid
}



export function getUserByEmail(email) {

  return db.prepate('Select * from users where email = ? ').get(email)
}