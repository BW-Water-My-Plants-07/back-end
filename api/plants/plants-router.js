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

// PUT edit a plant
router.put("/:id", async (req, res, next) => {
    const [lookupPlant] = await Plants.findById(req.params.id, req.decodedToken.subject)
    if (!lookupPlant) {
        res.status(404).json({
            message: "A plant with that ID doesn't exist"
        })
    } else {
        if (!req.body.nickname || !req.body.species || !req.body.h2oFrequency) {
            res.status(400).json({
                message: "Your plant needs a name, species, and water frequency!"
            })
        } else {
            try {
                const updatedPlant = await Plants.update(lookupPlant.plant_id, lookupPlant.user_id, req.body);
                res.status(200).json({"message": "Updated 1 plant friend!", "Updates": updatedPlant[0]});
            } catch (err) {
                res.status(500).json({
                    message: "The plant information could not be modified"
                })
            }
        }
    }
})

// DELETE remove a plant
router.delete("/:id", async (req, res, next) => {
    const [lookupPlant] = await Plants.findById(req.params.id, req.decodedToken.subject)
    if (!lookupPlant) {
        res.status(404).json({
            message: "A plant with that ID doesn't exist"
        })
    } else {
        try {
            const deletedPlant = await Plants.remove(lookupPlant.plant_id, lookupPlant.user_id)
            res.status(200).json(`Deleted ${deletedPlant} plant friend! ... you monster :'(`)
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