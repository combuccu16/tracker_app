const mongoose = require('mongoose')
const subTaskSchema = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'task',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    startedAt: {
        type: Date,
        default: null
    },
    completedAt: {
        type: Date,
        default: null
    },
    finished: {
        type: Boolean,
        default: false
    },
    timeSpent: {
        type: Number,
        default: 0,
    },
})

module.exports = mongoose.model('SubTask', subTaskSchema)
