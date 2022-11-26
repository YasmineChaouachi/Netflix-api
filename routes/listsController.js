const router = require("express").Router();
const List = require("../models/List");
const jwt = require("jsonwebtoken")

//CREATE

router.post("/", async (req, res) => {
    try {
        let newList = new List(req.body);

        console.log(newList);

        let savedList = await newList.save();
        res.status(400).send({ savedList, message: "List added succesfully ✅" })

    } catch (error) {
        console.log(error);
        res.status(400).send({ message: "List not saved!" })
    }


});


//GET

router.get("/", async (req, res) => {
    try {
        let typeQuery = req.query.type;
        let genreQuery = req.query.genre;
        let list = [];

        if (typeQuery) {
            if (genreQuery) {
                list = await List.aggregate(
                    [
                        { $match: { type: typeQuery, genre: genreQuery } },
                        { $sample: { size: 10 } },
                    ]);
            } else {
                list = await List.aggregate(
                    [
                        { $match: { type: typeQuery} },
                        { $sample: { size: 10 } },
                    ]);
            }
        } else {
            list = await List.aggregate(
                [
                    { $sample: { size: 10 } },
                ]);
        }

        res.status(200).json(list)
    } catch (e) {
        res.status(400).send({ message: "error fetching lists" })
    }

    /* pour afficher 10 listItem de type series et de genre comedy, on ajoute au request URL: ?type=series&genre=Comedy par exemple */


});

module.exports = router;