const db = require('../db');
const crypto = require('crypto');
const { generateAccessToken } = require('../function/token');
const hashingPassword = require('../function/hashingPassword');
const ApiError = require('../error/apiError');


class authOwnerController {
    async createOwner(req, res, next) {
        try {
            const { first_name, last_name = null, surname, phone_number = "", password = "", role = 'owner' } = req.body;

            if (first_name === "" || surname === "") {
                return next(ApiError.badRequest('First name or surname is empty'));
            }

            const isPhone = phone_number.match(/^\d{10}$/g);
            if (!isPhone) return next(ApiError.badRequest('Invalid phone number'));

            const correctPassword = password.match(/(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
            if (!correctPassword) return next(ApiError.badRequest('Invalid password'));

            const salt = crypto.randomBytes(20).toString('hex');
            const hashedPassword = hashingPassword(password, salt);
            const { id } = (await db.query(
                'INSERT INTO owner (first_name, last_name, surname, phone_number, salt, hash_password) values ($1, $2, $3, $4, $5, $6) RETURNING id',
                [first_name, last_name, surname, phone_number, salt, hashedPassword])).rows[0];
            const token = generateAccessToken(id, role)
            return res.json({ token });
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message))
        }
    }

    async authorization(req, res, next) {
        try {
            const { phone_number, password } = req.body;
            const phoneNumberOwnerSQL = await db.query('SELECT FROM owner where phone_number = $1', [phone_number])

            if (!phoneNumberOwnerSQL.rowCount) {
                return next(ApiError.badRequest('Phone number is not registered'));
            }

            const { salt, hash_password, id, role = 'owner' } =
                (await db.query('SELECT * FROM owner where phone_number = $1', [phone_number])).rows[0];
            console.log(id)
            if (hashingPassword(password, salt) !== hash_password) {
                return next(ApiError.badRequest('Password is bad'));
            }
            const token = generateAccessToken(id, role);
            return res.json({ token });
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message));
        }
    }

}

module.exports = new authOwnerController();
