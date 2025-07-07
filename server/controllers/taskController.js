const Task = require('../models/taskModel');
const GoalSet = require('../models/goalSetModel');
async function getTasks(req, res) {
    try {
        const tasks = await Task.find({ userId: req.session.userId });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching tasks', error: error.message });
    }
}
async function getCurrentTasks(req, res) {
    try {

        const { goalSetId } = req.body;
        const currentTasks = await Task.find({
            goalSetId: goalSetId
        });

        res.status(200).json(currentTasks);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching current tasks', error: error.message });
    }
}

async function addTask(req, res) {
    const { goalSetId, title, requiredHours, importance, color } = req.body;

    if (!goalSetId || !title || requiredHours === undefined || importance === undefined || !color) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        const latestGoalSet = await GoalSet.findById(goalSetId);
        const newTask = new Task({
            userId: req.session.userId,
            goalSetId: goalSetId,
            title,
            requiredHours,
            importance,
            color
        });

        await newTask.save();
        latestGoalSet.tasks.push({
            taskId: newTask._id,
            requiredHours: requiredHours,
            title: title
        });
        latestGoalSet.tasksCount += 1;
        latestGoalSet.totalImportance += importance;
        await latestGoalSet.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ msg: 'Error creating task', error: error.message });
    }
}

module.exports = {
    getTasks,
    getCurrentTasks,
    addTask
};