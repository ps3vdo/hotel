const db = require('../db');

class StaffController {
    
    async createStaff(req, res) {
        const { role, first_name, last_name, surname } = req.body;
        const newStaff = await db.query(
            'INSERT INTO staff (role, first_name, last_name, surname) values ($1, $2, $3, $4) RETURNING *',
            [role, first_name, last_name, surname]);
        res.json(newStaff.rows[0]);
    };

    async getStaff(req, res) {
        const staff = await db.query('SELECT * FROM staff');
        res.json(staff.rows)
    }

    async getOneStaff(req, res) {
        const id = req.params.id;
        const staff = await db.query('SELECT * FROM staff where id = $1', [id]);
        res.json(staff.rows[0]);
    }

    async updateStaff(req, res) {
        const { role, first_name, last_name, surname, id } = req.body;
        const staff = await db.query(
            'UPDATE staff set role = $1, first_name = $2, last_name = $3, surname = $4 where id = $5 RETURNING *',
            [role, first_name, last_name, surname, id]);
        res.json(staff.rows[0]);
    }

    async deleteStaff(req, res) {
        const id = req.params.id;
        const staff = await db.query('DELETE FROM staff where id = $1', [id]);
        res.json(staff.rows[0])
    }
}

module.exports = new StaffController()