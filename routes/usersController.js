const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

//UPDATE

router.patch("/:id", async (req, res) => {
    try {
        let userId = req.params.id
        let data = req.body
        let user = await User.findOneAndUpdate({ _id: userId }, data)

        if (user) {
            res.status(200).send({ message: "user updated succesfully" })
        }
        else {
            res.status(404).send({ message: "user not found !" })
        }

    } catch (error) {
        res.status(400).send({ message: "error fetching user" })
    }


})

//DELETE

// router.delete("/:id", async (req, res) => {
//     try {
//         let userId = req.params.id

//         let user = await User.findOneAndDelete({ _id: userId })

//         if (user) {
//             res.status(200).send({ message: "user deleted succesfully" })
//         }
//         else {
//             res.status(404).send({ message: "user not found !" })
//         }

//     } catch (error) {
//         res.status(400).send({ message: "error fetching user" })
//     }

// });

//GET
//GET ALL USERS
//GET USER STATS

module.exports = router;