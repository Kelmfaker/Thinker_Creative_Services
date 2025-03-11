const mongoose = require("mongoose");

const category = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String
    },
    image: {
        type: String

    }
}, { timestamps: true });



module.exports = mongoose.model("Category", category);