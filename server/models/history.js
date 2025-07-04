const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    xpGained: {
        type: Number,
        required: true,
        default: 0
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
        }
    }],
});

const History = mongoose.model('History', historySchema);
module.exports = History;
