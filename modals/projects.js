const mongoose = require("mongoose");

const project = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true

    },
    image: {
        type: String

    },
   
}, { timestamps: true });



module.exports = mongoose.model("project", project);