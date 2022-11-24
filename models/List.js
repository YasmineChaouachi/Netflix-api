const mongoose = require("mongoose")

const ListSchema = new mongoose.Schema({
    Listname: { type: String, require: true, unique: true },
    type: { type: String },
    genre: { type: String },
    content: { type: Array}
});

module.export = mongoose.model("List", ListSchema)