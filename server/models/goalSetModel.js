const mongoose = require('mongoose')
const goalSetSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' , 
        required: true
    }, 
    startDate: {
        type: Date,
        required : true , 
        min : null , 
        default: null,
    } , 
    endDate: {
        type: Date,
        required : true , 
        default: null,
    } ,
    title: {
        type: String,
        required: true,
        trim: true
    },
    tasksCount : {
        type: Number,
        default: 0,
        min: 0
    },
    totalImportance: {
        type: Number,
        default: 0,
        min: 0
    },
    tasks: [{
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'task',
            required: true
        },
        requiredHours: {
            type: Number,
            required: true,
            min: 0
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
    }],

})

const goalSetModel = mongoose.model('goalSet', goalSetSchema)

module.exports = goalSetModel