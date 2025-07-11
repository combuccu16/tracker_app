const mongoose = require('mongoose');
const idiomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description : {
        type: String,
        required: true,
        trim: true
    },
})

module.exports = mongoose.model('Idiom', idiomSchema);