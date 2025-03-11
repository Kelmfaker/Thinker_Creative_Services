const mongoose = require("mongoose");

const feedback = new mongoose.Schema({
    clientname: {
        type: String,
        required: true,
        unique: true,
    },
    company: {
        type: String
    },
    message: {
        type: String

    },
    rating:{
        type: number,
        enum: [1, 2, 3, 4, 5],
        required: true
    }
}, { timestamps: true });



module.exports = mongoose.model("feedback", feedback);