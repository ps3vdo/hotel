const db = require('../db')
/////Получить информацию о свободных местах и забронировать.
class ReservationController {

    async reservation(req, res) {
        const {place_id, date_start, date_end, id_owner, phone_number} = req.body;
            const reservationAdd = await db.query(
                'INSERT into reservation(place_id, date_start, date_end, id_owner, phone_number) values ($1, $2, $3, $4, $5) RETURNING * '
                [place_id, date_start, date_end, id_owner, phone_number]);
        res.json(reservationAdd.rows[0]);
    }
    async getFreePlace(req, res) {
        let arrFreePlace = (await db.query('SELECT * FROM place'));
        arrFreePlace = JSON.parse(arrFreePlace)
        res.json(arrFreePlace)



    }
//TODO добавить проверку свободных мест


}

module.exports = ReservationController