const mongoose = require("mongoose")

const MovieSchema = new mongoose.Schema({
    title: { type: String, require: true, unique: true },
    description: { type: String },
    img: { type: String },
    imgTitle: { type: String },
    imgSm: { type: String },
    trailer: { type: String },
    video: { type: String },
    year: { type: String },
    limit: { type: Number },
    genre: { type: String },
    isSeries: { type: Boolean, default: false }
});

module.export = mongoose.model("Movie", MovieSchema)