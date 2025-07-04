const subTask = require('../models/subTaskModel');
const Task = require('../models/tasksModel');
async function createSubTask(req, res) {
    try {
        const { taskId, title } = req.body;
        const newSubTask = new subTask({
            taskId,
            title,
        });
        await newSubTask.save();
        res.status(201).json({ message: 'Sub-task created successfully', subTask: newSubTask });
    } catch (error) {
        res.status(500).json({ message: 'Error creating sub-task', error: error.message });
    }
}

async function getSubTasks(req, res) {
    try {
        const { taskId } = req.body;
        const subTasks = await subTask.find({ taskId });
        res.status(200).json({ subTasks });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching sub-tasks', error: error.message });
    }
}

async function updateSubTask(req, res) {
    try {
        const { subTaskId } = req.body;
        const updates = req.body;
        const updatedSubTask = await subTask.findByIdAndUpdate(subTaskId, updates, { new: true });
        res.status(200).json({ message: 'Sub-task updated successfully', subTask: updatedSubTask });
    } catch (error) {
        res.status(500).json({ message: 'Error updating sub-task', error: error.message });
    }
}

async function deleteSubTask(req, res) {
    try {
        const { subTaskId } = req.body;
        await subTask.findByIdAndDelete(subTaskId);
        res.status(200).json({ message: 'Sub-task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting sub-task', error: error.message });
    }
}

async function startSubTask(req, res) {
    try {
        const { subTaskId } = req.body;
        const startedAt = new Date();
        const updatedSubTask = await subTask.findByIdAndUpdate(subTaskId, { startedAt }, { new: true });
        await updatedSubTask.save()
        res.status(200).json({ message: 'Sub-task started successfully', subTask: updatedSubTask });
    } catch (error) {
        res.status(500).json({ message: 'Error starting sub-task', error: error.message });
    }
}
async function pauseSubTask(req, res) {
    try {
        const DIFF = 5000;
        const { subTaskId, frontendStart, frontendFinish } = req.body;
        const completedAt = new Date();
        const task = await Task.findOne({ subTasks: subTaskId });
        const updatedSubTask = await subTask.findByIdAndUpdate(subTaskId, { completedAt }, { new: true });

        // we need to measure the difference between the frontend and backend start and finish times
        const frontendSpentTime = frontendFinish - frontendStart;
        const timeSpent = (updatedSubTask.completedAt - updatedSubTask.startedAt);
        if (Math.abs(frontendSpentTime - timeSpent) > DIFF) {
            updatedSubTask.timeSpent += frontendFinish - frontendStart;
            task.hoursSpent += frontendFinish - frontendStart;
        } else {
            updatedSubTask.timeSpent += timeSpent;
            task.hoursSpent += timeSpent;
        }
        updatedSubTask.startedAt = null;
        updatedSubTask.completedAt = null;
        await task.save();
        await updatedSubTask.save();
        res.status(200).json({ message: 'Sub-task paused successfully', subTask: updatedSubTask });
    } catch (error) {
        res.status(500).json({ message: 'Error pausing sub-task', error: error.message });
    }
}

async function resumeSubTask(req, res) {
    try {
        const DIFF = 1000;
        const { subTaskId, frontendStart } = req.body;
        const startedAt = new Date();
        if (Math.abs(frontendStart - startedAt) > DIFF) {
            startedAt = frontendStart
        }
        const updatedSubTask = await subTask.findByIdAndUpdate(subTaskId, { startedAt }, { new: true });
        await updatedSubTask.save();
        res.status(200).json({ message: 'Sub-task resumed successfully', subTask: updatedSubTask });
    } catch (error) {
        res.status(500).json({ message: 'Error resuming sub-task', error: error.message });
    }
}

async function finishSubTask(req, res) {
    try {
        const DIFF = 5000;
        const { subTaskId, frontendStart, frontendFinish } = req.body;
        const completedAt = new Date();
        const updatedSubTask = await subTask.findByIdAndUpdate(subTaskId, { completedAt }, { new: true });
        const task = await Task.findOne({ subTasks: subTaskId });
        // we need to measure the difference between the frontend and backend start and finish times
        const frontendSpentTime = frontendFinish - frontendStart;
        const timeSpent = (updatedSubTask.completedAt - updatedSubTask.startedAt);
        if (Math.abs(frontendSpentTime - timeSpent) > DIFF) {
            updatedSubTask.timeSpent += frontendFinish - frontendStart;
            task.hoursSpent += frontendFinish - frontendStart;
        } else {
            updatedSubTask.timeSpent += timeSpent;
            task.hoursSpent += timeSpent;
        }
        updatedSubTask.finished = true;
        updatedSubTask.startedAt = null;
        updatedSubTask.completedAt = null;
        await updatedSubTask.save();
        await task.save();
        res.status(200).json({ message: 'Sub-task finished successfully', subTask: updatedSubTask });
    }
    catch (error) {
        res.status(500).json({ message: 'Error finishing sub-task', error: error.message });
    }
}

module.exports = {
    createSubTask,
    getSubTasks,
    updateSubTask,
    deleteSubTask,
    startSubTask,
    pauseSubTask,
    resumeSubTask,
    finishSubTask
};