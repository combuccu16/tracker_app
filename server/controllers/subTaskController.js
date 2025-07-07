const subTask = require('../models/subTaskModel');
const User = require('../models/userModel');
const Task = require('../models/tasksModel');
const History = require('../models/historyModel');
const calculateXPandLVL = require('../helpers/xpManager.js').calculateXPandLVL;
async function createSubTask(req, res) {
    try {
        const { taskId, title } = req.body;
        const newSubTask = new subTask({
            taskId,
            title,
        });
        const task = await Task.findById(taskId);
        await newSubTask.save();
        task.subTasksNumber += 1;
        await task.save();
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
        const subTask = await subTask.findOne({ _id: subTaskId });
        const task = await Task.findById(subTask.taskId);
        await subTask.findByIdAndDelete(subTaskId);
        task.subTasksNumber -= 1;
        await task.save();
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
        const { subTaskId, taskId , goalSetId , frontendStart, frontendFinish } = req.body;
        const completedAt = new Date();
        const updatedSubTask = await subTask.findByIdAndUpdate(subTaskId, { completedAt }, { new: true });
        const task = await Task.findById(taskId);
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
        
        const user = await User.findById(task.userId);
        const taskFinished = false ;
        const lvlChanges = await calculateXPandLVL('subTask', task, goalSetId);
        task.finishedSubtasksCount += 1;
        user.coins += 10;
        if(task.subTasksNumber === task.finishedSubtasksCount) {
            lvlChanges = await calculateXPandLVL('task', task, goalSetId);
            taskFinished = true;
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            user.coins += 50; // bonus for finishing the task
            const tomorrow = new Date(today);
            tomorrow.setDate(tomorrow.getDate() + 1); 
            const todaysHistory = await History.findOne({ userId: task.userId, goalSetId , date: { $gte: today, $lt: tomorrow } });
            todaysHistory.tasksCompleted += 1;
            const isStreakUpdated = false ; 
            const isStreakBeaten = false ;
            if(todaysHistory.tasksCompleted === todaysHistory.tasksCount) {
                todaysHistory.tasks.push({
                    taskId: task._id,
                    hoursSpent: task.hoursSpent,
                    requiredHours: task.requiredHours,
                    completed: true,
                    subTaskCount: task.subTasksNumber,
                    finishedSubtasksCount: task.finishedSubtasksCount
                })
                todaysHistory.save();
                user.coins += 100; // bonus for finishing the goal set

                user.currentStreak += 1;
                isStreakUpdated = true ;
                if(user.currentStreak > user.longestStreak) {
                    user.longestStreak = user.currentStreak;
                    isStreakBeaten = true ;
                    // add animation here 
                }
                await user.save();
            }
        }
        updatedSubTask.finished = true;
        updatedSubTask.startedAt = null;
        updatedSubTask.completedAt = null;
        await updatedSubTask.save();
        await task.save();
        if(taskFinished) {
            res.status(200).json({ message: 'task finished successfully', subTask: updatedSubTask , changes: lvlChanges , task : task  ,coins : coins ,  isStreakUpdated , isStreakBeaten });
        } else {
            res.status(200).json({ message: 'Sub-task finished successfully', subTask: updatedSubTask  , changes: lvlChanges ,coins : coins , isStreakUpdated , isStreakBeaten });
        }
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