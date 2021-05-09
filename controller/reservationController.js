const db = require('../db');
const ApiError = require('../error/apiError')


class ReservationController {

    async reservation(req, res, next) {
        try {
            const {place_id, date_start, date_end, id_owner = "", phone = ""} = req.body;

            const {is_free} = (await db.query ('SELECT * FROM place where id = $1', [place_id])).rows[0];
            const isOwner = (await db.query ('SELECT * FROM owner where id = $1', [id_owner])).rowCount;
            const isReserved = (await db.query ('SELECT * FROM reservation where place_id = $1', [place_id])).rowCount;
            console.log(isReserved)

            if (!is_free) {
                return next(ApiError.badRequest("Place is taken,please choose another"));
            }

            if (isReserved) {
                return next(ApiError.badRequest(`Place ${place_id} already taken`));
            }

            if (!isOwner && phone === "") {
                return next(ApiError.badRequest("Please enter phone or id owner"));
            }
            else if (!isOwner && phone !== "") {
                const isPhone = phone.match(/^\d{10}$/g);
                if (!isPhone) return next(ApiError.badRequest('Invalid phone number'));
            }

            if (!isOwner) {
                const reservationAdd = await db.query(
                    'INSERT INTO reservation (place_id, date_start, date_end, phone) values ($1, $2, $3, $4) RETURNING * ',
                    [place_id, date_start, date_end, phone]);
                res.json(reservationAdd.rows[0]);
            } else {
                const reservationAdd = await db.query(
                    'INSERT INTO reservation (place_id, date_start, date_end, id_owner) values ($1, $2, $3, $4) RETURNING * ',
                    [place_id, date_start, date_end, id_owner]);
                res.json(reservationAdd.rows[0]);
            }
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new ReservationController()