const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
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

module.exports = router;