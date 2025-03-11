const mongoose = require("mongoose");

const service = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: number,
        required: true
    },

    image: {
        type: String,
        default: "https://via.placeholder.com/150x150.png"
    }
}, { timestamps: true });

module.exports = mongoose.model("service", service);