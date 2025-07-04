const goalSet = require('../models/goalSetModel');
async function getLatestGoalSet(req, res) {
    const userId = req.session.userId;
    const latestGoalSet = await goalSet.findOne({ userId }).sort({ endDate: -1 });
    return latestGoalSet;

}

module.exports = {
    getLatestGoalSet
};