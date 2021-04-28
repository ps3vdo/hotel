const db = require('../db');

class PetController {
    
    async createPet(req, res) {
        const { name, age, id_owner, staff_id } = req.body;
        const newPet = await db.query(
            'INSERT INTO pets (name, age, id_owner, staff_id) values ($1, $2, $3) RETURNING *', ///отсутствует привязка к питанию
            [name, age, id_owner, staff_id]);
        res.json(newPet.rows[0]);
    };

    async getPet(req, res) {
        const pets = await db.query('SELECT * FROM pets');
        res.json(pets.rows)
    }

    async getOnePet(req, res) {
        const id = req.params.id;
        const pet = await db.query('SELECT * FROM pets where id = $1', [id]);
        res.json(pet.rows[0]);
    }

    async updatePet(req, res) {
        const { name, age, id_owner, staff_id, id } = req.body;
        const pet = await db.query(
            'UPDATE pets set name = $1, age = $2 where id = $3 RETURNING *',
            [name, age, id_owner, staff_id, id]);
        res.json(pet.rows[0]);
    }

    async deletePet(req, res) {
        const id = req.params.id;
        const pet = await db.query('DELETE FROM pets where id = $1', [id]);
        res.json(pet.rows[0])
    }
}

module.exports = new PetController()