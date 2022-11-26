const router = require("express").Router();
const Movie = require("../models/Movie");
const jwt = require("jsonwebtoken")

//CREATE

router.patch("/:id", async (req, res) => {
    try {
        let newMovie = new Movie(req.body);

        console.log(newMovie);

        let savedMovie = await newMovie.save();
        res.status(400).send({ savedMovie, message: "Movie added succesfully ✅" })

    } catch (error) {
        res.status(400).send({ message: "Movie not saved!" })
    }


});


module.exports = router;