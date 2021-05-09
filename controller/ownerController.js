const db = require('../db');
const ApiError = require('../error/apiError');

//TODO change input data
class OwnerController {

    // async createOwner(req, res, next) {
    //     try {
    //         const { first_name, last_name, surname, phone_number, number_series_passport } = req.body;
    //         const newOwner = await db.query(
    //             'INSERT INTO owner (first_name, last_name, surname, phone_number, number_series_passport) values ($1, $2, $3, $4, $5) RETURNING *',
    //             [first_name, last_name, surname, phone_number, number_series_passport]);
    //         res.json(newOwner.rows[0]);
    //     } catch (e) {
    //         console.log(e);
    //         return next(ApiError.badRequest(e.message));
    //     }
    //
    // };
    async getOwners(req, res, next) {
        try {
            const owners = await db.query('SELECT * FROM owner');
            res.json(owners.rows);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
    async getOneOwner(req, res, next) {
        try {
            const id = req.params.id;
            const owner = await db.query('SELECT * FROM owner where id = $1', [id]);
            res.json(owner.rows[0]);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
    async updateOwner(req, res, next) {
        try {
            const { first_name, last_name, surname, phone_number, number_series_passport, id } = req.body;
            const owner = await db.query(
                'UPDATE owner set first_name = $1, last_name = $2, surname = $3, phone_number = $4, number_series_passport = $5 where id = $6 RETURNING *',
                [first_name, last_name, surname, phone_number, number_series_passport, id]);
            res.json(owner.rows[0]);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
    async deleteOwner(req, res, next) {
        try {
            const id = req.params.id;
            const owner = await db.query('DELETE FROM owner where id = $1', [id]);
            res.json(owner.rows[0]);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new OwnerController();