const mongoose = require("mongoose");

const request = new mongoose.Schema(
  {
    clientname: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email:{
        type: string,
        required: true,
    },
    message: {
          type: string,
          required: true,
        },
  
    date: {
      type: Date,
      default: Date.now,
    },
}, 
  { timestamps: true }
);

module.exports = mongoose.model("Request", request);
