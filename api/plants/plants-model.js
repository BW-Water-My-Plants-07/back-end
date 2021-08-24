const db = require('../../data/db-config');

// Resolves to an Array of all plants
function findByUserId(user_id) {
    return db('plants').where('user_id', user_id)
}

// Find a user's plant by plant ID
function findById(id, user_id) {
    return db('plants')
        .where({'plant_id':id, 'user_id':user_id})
}

// resolves to the newly inserted plant
async function add(plant) {
    const [id] = await db('plants').insert(plant, ['plant_id', 'user_id'])
    return findById(id.plant_id, id.user_id)
}

// edit
function update(id, user_id, plant) {
    db('plants')
        .where({'plant_id':id, 'user_id':user_id})
        .update(plant)
        return findById(id, user_id)
}

// delete
function remove(id, user_id) {
    return db('plants')
        .where({'plant_id':id, 'user_id':user_id})
        .del()
}

module.exports = {
    findByUserId,
    findById,
    add,
    remove,
    update,
};


