const router = require("express").Router();
const Plants = require("../plants/plants-model");

router.get("/", (req, res, next) => {
    Plants.findByUserId(req.decodedToken.subject)
        .then(plants => {
            res.json(plants);
        })
        .catch(next);
})

module.exports = router; 