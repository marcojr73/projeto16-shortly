import connectDB from "../config/bank.js";

const db = await connectDB()

async function searchEmail(email) {
	return db.query(`SELECT * FROM users WHERE email=$1`,[email]);
}

async function insertUser(name, email, passCripty){
    return db.query(`INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3);`,
    [name, email, passCripty])    
}

async function insertSession(id, token){
    return db.query(`INSERT INTO sessions ("userId", token) VALUES ($1, $2)`,[id, token])
}

export const registrationRepository = {
	searchEmail,
    insertUser,
    insertSession
}
