const History = require("../models/history");
const GoalSet = require("../models/goalSetModel");
const subTaskModel = require("../models/subTaskModel");
async function initOnLogin(userId) {
    const today = new Date();
    const todaysHistory = await History.findOne({ userId, date: today });
    
    if (!todaysHistory) {
        const currentGoalSet = await GoalSet.findOne({ userId, date: today });
         
        if (currentGoalSet) {
            await History.create({
                userId,
                goalSetId: currentGoalSet._id,
                date: today,
                tasksCompleted: 0,
                tasks: currentGoalSet.tasks.map(task => ({
                    taskId: task._id,
                    title: task.title,
                    requiredHours: task.requiredHours , 
                    subTaskCount: task.subTasksNumber,
                    finishedSubtasksCount: task.finishedSubtasksCount
                })),
            });
        }
    }
}
async function initOnGoalCreate(userId, goalSet) {
    const today = new Date();
    await History.create({
        userId,
        goalSetId: goalSet._id,
        date: today,
        tasksCompleted: 0,
        tasks: goalSet.tasks.map(task => ({
            taskId: task._id,
            title: task.title,
            requiredHours: task.requiredHours,
            subTaskCount: task.subTasksNumber,
            finishedSubtasksCount: task.finishedSubtasksCount
            })),
    })
}

module.exports = { initOnLogin, initOnGoalCreate };