const router = require("express").Router();
const Users = require("./users-model")

// GET user - read info
router.get("/", (req, res, next) => {
    Users.findById(req.decodedToken.subject)
        .then(users => {
            res.json(users);
        })
        .catch(next);
})

// PUT user - edit info
router.put("/", async (req, res, next) => {
    const lookupUser = await Users.findById(req.decodedToken.subject)
    if (!lookupUser) {
        res.status(404).json({
            message: "A user with that ID doesn't exist, which shouldn't be possible. Who are you?"
        })
    } else {
        if (!req.body.username || !req.body.phoneNumber) {
            res.status(400).json({
                message: "Please enter a valid username and phone number"
            })
        } else {
            const newUser = {
                username: req.body.username,
                phoneNumber: req.body.phoneNumber
            }
            try {
                const updatedUser = await Users.update(lookupUser.user_id, newUser)
                res.status(200).json({
                    "message": "Updated user info",
                    "Original User": lookupUser,
                    "Updated User": updatedUser
                })
            } catch (err) {
                res.status(500).json({
                    message: "The user information could not be modified",
                    err: err.message
                })
            }

        }
    }
})

module.exports = router;