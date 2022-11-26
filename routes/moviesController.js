const router = require("express").Router();
const Movie = require("../models/Movie");
const jwt = require("jsonwebtoken")

//CREATE

router.post("/", async (req, res) => {
    try {
        let newMovie = new Movie(req.body);

        console.log(newMovie);

        let savedMovie = await newMovie.save();
        res.status(400).send({ savedMovie, message: "Movie added succesfully ✅" })

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "Movie not saved!" })
    }


});

//UPDATE

router.patch("/:id", async (req, res) => {
    try {
        let movieId = req.params.id
        let data = req.body
        let movie = await Movie.findOneAndUpdate({ _id: movieId }, data)

        if (movie) {
            res.status(200).send({ message: "Movie updated succesfully ✅" })
        }
        else {
            res.status(404).send({ message: "Movie not found !" })
        }

    } catch (error) {
        res.status(400).send({ message: "error fetching movie" })
    }


})


module.exports = router;