

export function createUser(email,password) {

    const res =  db.prepate('Insert into users (email,password) values (?,?)').run(email,password)
    return res.lastInsertRowid
}