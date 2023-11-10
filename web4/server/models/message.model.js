const mongoose = require("mongoose");

const Message = mongoose.model("Message", new mongoose.Schema({
    messageText: String,
    deliveredStatus: Boolean,
    sendBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    sendDate: Date,
    readers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}))

module.exports = Message;