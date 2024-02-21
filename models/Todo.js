const mongoose = require("mongoose")

const todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    
}, {timestamps: true})
module.exports = mongoose.model("todo", todoSchema)