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

//DELETE
router.delete("/:id", async (req, res) => {
    try {
        let movieId = req.params.id

        let movie = await Movie.findOneAndDelete({ _id: movieId })

        if (movie) {
            res.status(200).send({ message: "The movie has been deleted... ✅" })
        }
        else {
            res.status(404).send({ message: "Movie not found !" })
        }

    } catch (error) {
        res.status(400).send({ message: "error fetching movie" })
    }

});

//GET

router.get("/find/:id", async (req, res) => {
    try {
        let type = req.query.type;
        let movie;

        if (type == "series") {
            movie = await Movie.aggregate(
                [
                    { $match: { isSeries: true } },
                    { $sample: { size: 1 } },
                ]);
        } else {
            movie = await Movie.aggregate(
                [
                    { $match: { isSeries: false } },
                    { $sample: { size: 1 } },
                ]);
        }
        res.status(200).json(movie)
    } catch (e) {
        res.status(400).send({ message: "error fetching movies" })
    }
});

//GET RANDOM MOVIE

router.get("/random", async (req, res) => {
    try {
        let type = req.query.type;
        let movie;

        if (type == "series") {
            movie = await Movie.aggregate(
                [
                    { $match: { isSeries: true } },
                    { $sample: { size: 1 } },
                ]);
        } else {
            movie = await Movie.aggregate(
                [
                    { $match: { isSeries: false } },
                    { $sample: { size: 1 } },
                ]);
        }
        res.status(200).json(movie)
    } catch (e) {
        res.status(400).send({ message: "error fetching movies" })
    }

    /* pour afficher random series on ajoute au request URL: ?type=series */

});

//GET ALL MOVIES & SERIES

router.get("/find/", async (req, res) => {
    try {
        let movies = await Movie.find();
        res.status(200).send(movies.reverse());
    } catch (e) {
        res.status(400).send({ message: "error fetching movies" });
    }
});

module.exports = router;