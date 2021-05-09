const db = require('../db');
const ApiError = require('../error/apiError');


class PlaceController {
    
    async createPlace(req, res, next) {
        try {
            const {is_free, date_start, date_end, id_pets} = req.body;
            const newPlace = await db.query(
                'INSERT INTO place (is_free, date_start, date_end, id_pets) values ($1, $2, $3, $4) RETURNING *',
                [is_free, date_start, date_end, id_pets]);
            res.json(newPlace.rows[0]);
            res.send({message:'Place created'});
        } catch(e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }

    };

    async getPlace(req, res, next) {
        try {
            const place = await db.query('SELECT * FROM place');
            res.json(place.rows);
        } catch(e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
    async getFreePlace(req, res, next) {
        try {
            const arrFreePlace = await db.query('SELECT * FROM place where is_free = true');
            res.json(arrFreePlace.rows);
        } catch(e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async getOnePlace(req, res, next) {
        try {
            const id = req.params.id;
            const place = await db.query('SELECT * FROM place where id = $1', [id]);
            res.json(place.rows[0]);
        } catch(e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async updatePlace(req, res, next) {
        try {
            const {is_free, date_start, date_end, id_pets} = req.body;
            const place = await db.query(
                'UPDATE place set role = $1, first_name = $2, last_name = $3, surname = $4 where id = $5 RETURNING *',
                [is_free, date_start, date_end, id_pets]);
            res.json(place.rows[0]);
        } catch(e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async deletePlace(req, res, next) {
        try {
            const id = req.params.id;
            const place = await db.query('DELETE FROM place where id = $1', [id]);
            res.json(place.rows[0]);
        } catch(e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new PlaceController()