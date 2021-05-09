const db = require('../db');
const ApiError = require('../error/apiError');

class OwnerHotelController {

    async getPets(req, res, next) {
        try {
            const pets = await db.query('SELECT * FROM pets');
            res.json(pets.rows);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
    async getFreePlace(req, res, next) {
        try {
            const place = await db.query('SELECT * FROM place where is_free = true');
            res.json(place.rows);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

}
module.exports = new OwnerHotelController();