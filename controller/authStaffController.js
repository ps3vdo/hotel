const db = require('../db');
const {generateAccessToken} = require('../function/token');
const hashingPassword = require('../function/hashingPassword');
const ApiError = require('../error/apiError');

const roles = ["staff", "doctor"];

const badRequest = message => {
    return {
        code: "BadRequest",
        message,
    }
}

class authStaffController {
    async createStaff(req, res, next) {
        try {
            const {first_name, last_name = null, surname, phone_number = "", role, password = ""} = req.body;

            if (first_name === "" || surname === "") {
                return next(ApiError.badRequest('First name or surname is empty'));
            }

            const isPhone = phone_number.match(/^\d{10}$/g);
            if (!isPhone) return next(ApiError.badRequest('Invalid phone number'));

            const correctPassword = password.match(/(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/);
            if (!correctPassword) return next(ApiError.badRequest('Invalid password'));

            const salt = crypto.randomBytes(20).toString('hex');
            const hashedPassword = hashingPassword(password, salt);

            if (roles.includes(role)) {
                await db.query(
                    'INSERT INTO staff (first_name, last_name, surname, role, phone_number, salt, hash_password)values ($1, $2, $3, $4, $5) RETURNING *',
                    [first_name, last_name, surname, role, phone_number, salt, hashedPassword]);
                res.send("персонал добавлен");
            } else return res.status(400).send(badRequest('Role unknown, please select your role '));
        } catch (e) {
            return next(ApiError.badRequest(e.message));
        }
    }

    async staffAuthorization(req, res, next) {
        try {
            const {phone_number, password} = req.body;
            const phoneNumberStaffSQL = await db.query('SELECT FROM staff where phone_number = $1', [phone_number])

            if (!phoneNumberStaffSQL.rowCount) {
                return next(ApiError.badRequest('Phone number is not registered'));
            }

            const {salt, hash_password, id, role} =
                (await db.query('SELECT * FROM owner where phone_number = $1', [phone_number])).rows[0];

            if (hashingPassword(password, salt) !== hash_password) {
                return next(ApiError.badRequest('Password is bad'));
            }
            const token = generateAccessToken(id, role);
            return res.json({token});
        } catch (e) {
            console.log(e.message);
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new authStaffController();
