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
            res.status(200).send({ message: "user updated succesfully ✅" })
        }
        else {
            res.status(404).send({ message: "user not found !" })
        }

    } catch (error) {
        res.status(400).send({ message: "error fetching user" })
    }


})

//DELETE

router.delete("/:id", async (req, res) => {
    try {
        let userId = req.params.id

        let user = await User.findOneAndDelete({ _id: userId })

        if (user) {
            res.status(200).send({ message: "user deleted succesfully ✅" })
        }
        else {
            res.status(404).send({ message: "user not found !" })
        }

    } catch (error) {
        res.status(400).send({ message: "error fetching user" })
    }

});

//GET

router.get("/find/:id", async (req, res) => {
    try {
        let users = await User.findById(req.params.id)
        res.status(200).send(users)
    } catch (e) {
        res.status(400).send({ message: "error fetching users" })
    }
})

//GET ALL USERS

router.get("/find/", async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).send(users);
    } catch (e) {
        res.status(400).send({ message: "error fetching users" });
    }
})

//GET USER STATS

router.get("/sats/", async (req, res) => {
    try {
        let today = new Date();
        let lastYear = today.setFullYear(today.setFullYear() - 1);

        let monthsArray = [
            "janvier",
            "février",
            "Mars",
            "avril",
            "Mai",
            "juin",
            "juillet",
            "août",
            "septembre",
            "octobre",
            "novembre",
            "décembr",]

        let data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            }, {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(data)

    } catch (e) {
        res.status(400).json(e);
    }
})


module.exports = router;