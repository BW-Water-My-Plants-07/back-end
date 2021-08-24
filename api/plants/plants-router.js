const router = require("express").Router();
const Plants = require("../plants/plants-model");

// GET a user's plants
router.get("/", (req, res, next) => {
    Plants.findByUserId(req.decodedToken.subject)
        .then(plants => {
            res.json(plants);
        })
        .catch(next);
})

// GET a specific plant
router.get("/:id", (req, res, next) => {
    Plants.findByUserId(req.decodedToken.subject)
        .then(plants => {
            res.json(plants);
        })
        .catch(next);
})


// POST add a plant
router.post("/", (req, res, next) => {
    const plant = req.body
    plant.user_id = req.decodedToken.subject
    Plants.add(plant)
        .then(plant => {
            res.status(201).json(plant)
        })
        .catch(next)
})



//TODO PUT edit a plant



//TODO DELETE remove a plant



module.exports = router; 