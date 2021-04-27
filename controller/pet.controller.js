const db = require('../db');
class PetController {
    async createPet(req, res) {
        const {name, age, id_owner} = req.body;
        const newPet = await db.query(
            'INSERT INTO pets (name, age, id_owner) values ($1, $2, $3) RETURNING *', ///привязка только к владельцу
            [name, age, id_owner]);
        res.json(newPet.rows[0]);
        console.log(newPet.rows)
    };
    async getPet(req, res) {
        const pets = await db.query('SELECT * FROM pets');
        res.json(pets.rows)
    }
    async getOnePet(req, res) {
        const id = req.params.id;
        const pet = await db.query('SELECT * FROM pets where id = $1', [id]);
        res.json(pet.rows[0])
    }
    async updatePet(req, res) {
        const {name, age, id } = req.body;
        const pet = await db.query(
            'UPDATE pets set name = $1, age = $2 where id = $3 RETURNING *',
            [name, age, id]);
        res.json(pet.rows[0]);
    }
    async deletePet(req, res) {
        const id = req.params.id;
        const pet = await db.query('DELETE FROM pets where id = $1', [id]);
        res.json(pet.rows[0])
    }
}
module.exports = new PetController()