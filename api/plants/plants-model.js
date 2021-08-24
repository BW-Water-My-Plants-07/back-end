const db = require('../../data/db-config');

// Resolves to an Array of all plants
function findByUserId(user_id) {
    return db('plants').where('user_id', user_id)
}

// Find plant by User ID
function findById(id) {
    return db('plants').where('plant_id', id)
}

// resolves to the newly inserted plant
async function add(plant) {
    const [id] = await db('plants').insert(plant)
    return findById(id)
}

module.exports = {
    findByUserId,
    findById,
    add
};


