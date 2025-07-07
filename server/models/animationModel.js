const mongoose = require('mongoose');
const animationSchema = new mongoose.Schema({
  name: {   
    type: String,
    required: true,
    unique: true,
    trim: true
    },
    price : {
        type: Number,
        required: true,
        min: 0
    },
    animation : {
        type: String,
        required: true,
        trim: true
    },

})

module.exports = mongoose.model('Animation', animationSchema);