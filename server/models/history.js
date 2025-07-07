const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    goalSetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GoalSet',
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
    tasks: [{
        taskId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task',
            required: true
        },
        title : {
            type: String,
            required: true,
            trim: true
        },
        hoursSpent: {
            type: Number,
            required: true,
            default: 0
        },
        requiredHours: {
            type: Number,
            required: true,
            min: 0
        },
        completed: {
            type: Boolean,
            default: false
        },
        subTaskCount : {
            type: Number,
            required: true,
            default: 0
        },
        finishedSubtasksCount: {
            type: Number,
            required: true,
            default: 0
        }
    }],
    tasksCompleted: {
        type: Number,
        required: true,
        default: 0
    },
    tasksCount: {
        type: Number,
        required: true,
        default: 0
    }

});

const History = mongoose.model('History', historySchema);
module.exports = History;
