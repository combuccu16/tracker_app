const Goalset = require('../models/goalSetModel.js');
const User = require('../models/userModel.js');
async function calculateXPandLVL(taskType , task = null , goalSetId ) {
    const goalSet = await Goalset.findById(goalSetId) 
    const user = await User.findById(goalSet.userId);
    switch(taskType) {
        case 'subTask':
            user.currentXp += (100/task.subTasksCount)*(task.importance / goalSet.totalImportance);
            break; 
        case 'task':
            if(task.finishedSubtasksCount === task.subTasksCount) {
                if(task.hoursSpent > task.requiredHours) {
                    user.currentXp += (75)*(task.importance / goalSet.totalImportance);
                }else{
                    user.currentXp += (125)*(task.importance / goalSet.totalImportance);
                }
            }else{
                if (task.subTasksCount / task.finishedSubtasksCount < 0.5) {
                    user.currentXp -= (50)*(task.importance / goalSet.totalImportance);
                }
            }
            break ;
        }
        if (user.currentXp >= user.nextLvlXp) {
            user.lvl += 1;
            user.coins += 200 * (user.lvl / 7 + 1);
            user.currentXp -= user.nextLvlXp;
            user.nextLvlXp = Math.floor(user.nextLvlXp * 1.2);
        }
        await user.save();
        return {
            currentXp: user.currentXp,
            lvl: user.lvl,
            nextLvlXp: user.nextLvlXp , 
            coins: user.coins
        };    
    }
    

module.exports = {
    calculateXPandLVL
}