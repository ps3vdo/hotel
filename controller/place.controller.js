const db = require('../db');

class PlaceController {
    
    async createPlace(req, res) {
        const { role, first_name, last_name, surname } = req.body;
        const newPlace = await db.query(
            'INSERT INTO place (role, first_name, last_name, surname) values ($1, $2, $3, $4) RETURNING *', ///привязка только к владельцу
            [role, first_name, last_name, surname]);
        res.json(newPlace.rows[0]);
    };

    async getPlace(req, res) {
        const place = await db.query('SELECT * FROM place');
        res.json(place.rows)
    }

    async getOnePlace(req, res) {
        const id = req.params.id;
        const place = await db.query('SELECT * FROM place where id = $1', [id]);
        res.json(place.rows[0]);
    }

    async updatePlace(req, res) {
        const { role, first_name, last_name, surname, id } = req.body;
        const place = await db.query(
            'UPDATE place set role = $1, first_name = $2, last_name = $3, surname = $4 where id = $5 RETURNING *',
            [role, first_name, last_name, surname, id]);
        res.json(place.rows[0]);
    }

    async deletePlace(req, res) {
        const id = req.params.id;
        const place = await db.query('DELETE FROM place where id = $1', [id]);
        res.json(place.rows[0])
    }
}

module.exports = new PlaceController()