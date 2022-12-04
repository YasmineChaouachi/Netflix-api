const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const verify = require("../verifyToken")

//UPDATE

router.patch("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            let userId = req.params.id
            let data = req.body
            let user = await User.findOneAndUpdate({ _id: userId }, { $set: data }, { new: true })

            if (user) {
                res.status(200).send({ message: "user updated succesfully ✅" })
            }
            else {
                res.status(404).send({ message: "user not found !" })
            }


        } catch (error) {
            res.status(400).send({ message: "error fetching user" })
        }
    } else {
        res.status(403).json("You can update only your account!");
    }


})

//DELETE

router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
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
    } else {
        res.status(403).json("You can delete only your account!");
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

router.get("/find/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            let query = req.query.new;
            let users = query ? await User.find().limit(5) : await User.find();
            res.status(200).send(users);
        } catch (e) {
            res.status(400).send({ message: "error fetching users" });
        }
    } else {
        res.status(403).json("You are not allowed to see all users!");
    }

});

//GET USER STATS

router.get("/sats/", verify, async (req, res) => {
    if (req.user.isAdmin) {
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
    }

    else {
        res.status(403).json("You are not allowed to see all users!");
    }
});


module.exports = router;