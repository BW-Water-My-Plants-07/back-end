const db = require('../../data/db-config');

// Resolves to an Array of all plants
function findByUserId(user_id) {
    return db('plants').where('user_id', user_id)
}

function findById(id) {
    return db('plants').where('plant_id', id)
}

// TODO: ADD

module.exports = {
    findByUserId,
    findById,
    // add
};


