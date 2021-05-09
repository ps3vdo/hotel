const db = require('../db');
const ApiError = require('../error/apiError');


class StaffController {

    async getStaff(req, res, next) {
        try {
            const staff = await db.query('SELECT * FROM staff');
            res.json(staff.rows);
        } catch(e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async getOneStaff(req, res, next) {
        try {
            const id = req.params.id;
            const staff = await db.query('SELECT * FROM staff where id = $1', [id]);
            res.json(staff.rows[0]);
        } catch(e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async updateStaff(req, res, next) {
        try {
            const { role, first_name, last_name, surname, id } = req.body;
            const staff = await db.query(
                'UPDATE staff set role = $1, first_name = $2, last_name = $3, surname = $4 where id = $5 RETURNING *',
                [role, first_name, last_name, surname, id]);
            res.json(staff.rows[0]);
        } catch(e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async deleteStaff(req, res, next) {
        try {
            const id = req.params.id;
            const staff = await db.query('DELETE FROM staff where id = $1', [id]);
            res.json(staff.rows[0]);
        } catch(e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new StaffController()