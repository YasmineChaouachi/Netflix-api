const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

// REGISTER
router.post("/register", async (req, res) => {

    try {
        let data = req.body
        // hashage du mot de passe 
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10))

        let newUser = new User({
            username: data.username,
            email: data.email,
            password: data.password,
        });
        console.log(newUser);

        const savedUser = await newUser.save();

        res.status(201).send({ savedUser, message: "user added succesfully" });

    } catch (err) {
        console.log(err);
        res.status(500).send({ message: "user not saved " });
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {

        let data = req.body

        let user = await User.findOne({ email: data.email })

        if (user) {
            let compare = bcrypt.compareSync(data.password, user.password)
            if (compare) {
                let myToken = jwt.sign({ role: user.role, id: user._id }, "SECRET-KEY")
                res.status(200).send({user, token: myToken })
            } else {
                res.status(404).send({ message: "user not found !" })
            }
        } else {
            res.status(404).send({ message: "user not found !" })
        }

    } catch (error) {
        res.status(400).send({ message: "error fetching user" })
    }
})


module.exports = router;