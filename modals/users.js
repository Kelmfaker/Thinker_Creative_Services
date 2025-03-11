const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["member", "needer"],
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "https://via.placeholder.com/150x150.png"
    }
}, { timestamps: true });

module.exports = mongoose.model("User", user);