const db = require('../db');

class PetsController {
    
    async createPet(req, res) {
        const { name, age, id_owner, staff_id, type } = req.body;
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
        const { name, age, id_owner, staff_id, id, type } = req.body;
        const pet = await db.query(
            'UPDATE pets set name = $1, age = $2, id_owner = $3, staff_id = $4 type = $6 where id = $4 RETURNING *',
            [name, age, id_owner, staff_id, id, type]);
        console.log(pet.rows[0])
        res.send({message: "Animal info update"});
    }

    async deletePet(req, res) {
        const id = req.params.id;
        const pet = await db.query('DELETE FROM pets where id = $1', [id]);
        res.json(pet.rows[0])
    }
}

module.exports = new PetsController()