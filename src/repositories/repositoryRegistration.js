import connectDB from "../config/bank.js";

const db = await connectDB()

async function searchEmail(email) {
	return db.query(`SELECT * FROM users WHERE email=$1`,[email]);
}

async function insertUser(name, email, passCripty, date){
    return db.query(`INSERT INTO users (name, email, password, "createdAt") 
    VALUES ($1, $2, $3, $4);`,
    [name, email, passCripty, date])    
}

async function insertSession(id, token){
    return db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`,[id, token])
}

export const registrationRepository = {
	searchEmail,
    insertUser,
    insertSession
}
