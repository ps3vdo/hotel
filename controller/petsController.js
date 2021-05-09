const db = require('../db');
const ApiError = require('../error/apiError');
//TODO добавить проверки:.. какие?
class PetsController {

    async createPet(req, res, next) {
        try {
            const { name, age, id_owner, staff_id } = req.body;
            const newPet = await db.query(
                'INSERT INTO pets (name, age, id_owner, staff_id) values ($1, $2, $3) RETURNING *', //TODO отсутствует привязка к питанию
                [name, age, id_owner, staff_id]);
            res.json(newPet.rows[0]);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async getPet(req, res, next) {
        try {
            const pets = await db.query('SELECT * FROM pets');
            res.json(pets.rows);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async getOnePet(req, res, next) {
        try {
            const id = req.params.id;
            const pet = await db.query('SELECT * FROM pets where id = $1', [id]);
            res.json(pet.rows[0]);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async updatePet(req, res, next) {
        try {
            const { name, age, id_owner, staff_id, id } = req.body;
            const pet = await db.query(
                'UPDATE pets set name = $1, age = $2 where id = $3 RETURNING *',
                [name, age, id_owner, staff_id, id]);
            res.json(pet.rows[0]);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }

    async deletePet(req, res, next) {
        try {
            const id = req.params.id;
            const pet = await db.query('DELETE FROM pets where id = $1', [id]);
            res.json(pet.rows[0]);
        } catch (e) {
            console.log(e);
            return next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new PetsController()