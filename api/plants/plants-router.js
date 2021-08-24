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



// DELETE remove a plant
router.delete("/:id", async (req, res, next) => {
    const [lookup] = await Plants.findById(req.params.id, req.decodedToken.subject)
    if (!lookup) {
        res.status(404).json({
            message: "A plant with that ID doesn't exist"
        })
    } else {
        try {
            const deletedPlant = await Plants.remove(lookup.plant_id, lookup.user_id)
            res.status(200).json(`Deleted ${deletedPlant} plant`)
        }
        catch (err) {
            res.status(500).json({
                message: "Hmm, that plant couldn't be removed!",
                err: err.message
            })
        }
    }
})



module.exports = router; 