const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        goalSetId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'goalSet',
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        requiredHours: {
            type: Number,
            required: true,
            min: 0
        },
        importance: {
            type: Number,
            required : true, 
            min: 1,
            default : 1 , 
        },
        color: {
            type: String,
            required: true,
            default: '#ffffff'
        },
        hoursSpent: {
            type: Number,
            default: 0,
            min: 0
        },

    }
)

const taskModel = mongoose.model('task', taskSchema)
module.exports = taskModel