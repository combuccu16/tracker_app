const Task = require('../models/taskModel');
const { getLatestGoalSet } = require('../helpers/goalSetHelper');
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
        const latestGoalSet = await getLatestGoalSet(req, res);
        if (!latestGoalSet) {
            return res.status(404).json({ msg: 'No active goal set found' });
        }

        const currentTasks = await Task.find({
            goalSetId: latestGoalSet._id,
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
        const latestGoalSet = await getLatestGoalSet(req, res);
        const newTask = new Task({
            userId: req.session.userId,
            goalSetId: latestGoalSet._id,
            title,
            requiredHours,
            importance,
            color
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ msg: 'Error creating task', error: error.message });
    }
}