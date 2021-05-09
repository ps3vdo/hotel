const db = require('../db');
const ApiError = require('../error/apiError');

class EatController{
    async createEat(req, res, next) {
        try {
            const { type, number_of_times, eat } = req.body;
            const newEat = await db.query(
                'INSERT INTO eat (type, number_of_times, eat) values ($1, $2, $3) RETURNING *',
                [type, number_of_times, eat]);
            res.json(newEat.rows[0]);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
    async getAllEat(req, res, next) {
        try {
            const allEat = await db.query('SELECT * FROM eat');
            res.json(allEat.rows);
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e.message));
        }
    }
    async getEat(req, res, next) {
        try {
            const id = req.params.id;
            const eat = await db.query('SELECT * FROM eat where id = $1', [id]);
            res.json(eat.rows[0]);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
    async updateEat(req, res, next) {
        try {
            const { type, number_of_times, eat, id } = req.body;
            const eatUpd = await db.query(
                'UPDATE eat set type = $1, number_of_times = $2, eat = $3 where id = $4 RETURNING *',
                [type, number_of_times, eat, id]);
            res.json(eatUpd.rows[0]);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
    async deleteEat(req, res, next) {
        try {
            const id = req.params.id;
            const eat = await db.query('DELETE FROM eat where id = $1', [id]);
            res.json(eat.rows[0]);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new EatController();