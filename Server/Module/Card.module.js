const mongoose = require("mongoose");
const User=require('./User.module');


const cardSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name:{type:String,required:true},
    subtask:[{type:String}]
}, 

);

const Card = mongoose.model('Card', cardSchema);

module.exports = Card;