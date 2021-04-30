const db = require('../db');
const crypto = require("crypto");
const {SECRET} = require('../config');

const roles = ["staff", "admin", "doctor", "hotel_owner"];

const badRequest = message => {
    return {
        code: "BadRequest",
        message,
    }
}

const generateAccessToken = (id, role) => {
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    }
    const payload = {
		id,
		role,
        expires_at: Date.now() + 60*60*1000
	}

    const oneString = Buffer.from(JSON.stringify(header),).toString();
    const twoString = Buffer.from(JSON.stringify(payload)).toString("base64");
    const tokenWithOut = oneString + "." + twoString;
    const treeString = crypto.createHmac('sha256', SECRET).update(tokenWithOut).digest('hex');
    console.log(oneString)
	return tokenWithOut + "." + treeString;
}

class authController {
    async createUser(req, res) {
        const { first_name, last_name = null, surname, phone_number = "", role, password = "" } = req.body;

        if (first_name === "" || surname === "") {
            return res.status(400).send(badRequest('First name or surname is empty'));
        }

        const isPhone = phone_number.match(/^\d{10}$/g);
        if (!isPhone) return res.status(400).send(badRequest('Invalid phone number'));

        const correctPassword = password.match(/(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
        if (!correctPassword) return res.status(400).send(badRequest('Invalid password'));

        const salt = crypto.randomBytes(20).toString('hex');
        const hashedPassword = crypto.pbkdf2Sync(password, Buffer.from(salt, "hex"), 10000, 64, "sha512")
            .toString("hex");

        if (role === "owner") {
            await db.query(
                'INSERT INTO owner (first_name, last_name, surname, phone_number, salt, hash_password) values ($1, $2, $3, $4, $5, $6) RETURNING *',
                [first_name, last_name, surname, phone_number, salt, hashedPassword]);
            res.send("владелец добавлен");///TODO
        } else if (roles.includes(role)) {
            await db.query(
                'INSERT INTO staff (first_name, last_name, surname, role, phone_number, salt, hash_password) values ($1, $2, $3, $4, $5) RETURNING *',
                [first_name, last_name, surname, role, phone_number, salt, hashedPassword]);
            res.send("персонал добавлен");
        }
		else return res.status(400).send(badRequest('Role unknow, please select youre role '));
    }
	
	async authorization(req, res) {
		const {phone_number, password} = req.body;
		const phoneNumberOwnerSQL = await db.query('SELECT FROM owner where phone_number = $1', [phone_number])
        const phoneNumberStaffSQL = await db.query('SELECT FROM staff where phone_number = $1', [phone_number])


		if (!phoneNumberOwnerSQL.rowCount) {
            if (!phoneNumberStaffSQL.rowCount) {
                return res.status(400).send(badRequest('Phone number is not registered'));
            }
        }
		
		const {salt, hash_password, id, role = 'owner'} = (await db.query('SELECT * FROM owner where phone_number = $1', [phone_number])).rows[0]
        const validPassword = crypto.pbkdf2Sync(password, Buffer.from(salt, "hex"), 10000, 64, "sha512")
            .toString("hex");
		if (validPassword !== hash_password) {
			return res.status(400).send(badRequest('Password is bad'));
		}
		const token = generateAccessToken(id, role);
		return res.json({token});			
	}
}

module.exports = new authController();
