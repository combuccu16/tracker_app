const goalSet = require('../models/goalSetModel');
const { getLatestGoalSet } = require('../helpers/goalSetHelper');
const { initOnGoalCreate } = require('../helpers/initiUserHistory');
async function getGoalSets(req, res) {
    try {
        const userId = req.session.userId;
        const goalSets = await goalSet.findOne({userId,});
        res.status(200).json({ goalSets});
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching goal sets', error: error.message });
    }
}

async function getCurrentGoalSet(req, res) {
    try {
        const today = new Date();
        const userId = req.session.userId;
        const currentGoalSet = await goalSet.findOne({
            userId,
            startDate: { $lte: today },
            endDate: { $gte: today }
        });
        res.status(200).json({ currentGoalSet });
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching goal sets', error: error.message });
    }
}


async function addGoalSet(req, res) {
    const { title,  startDate, endDate  } = req.body;
    if (!title || !startDate || !endDate) {
        return res.status(400).json({ msg: 'All fields are required' });
    }

    try {
        const latestGoalSet = await getLatestGoalSet(req, res);
        if( !latestGoalSet || latestGoalSet.endDate <= new Date()) {
            const newGoalSet = new goalSet({
                userId: req.session.userId,
                title,
                startDate,
                endDate
            });

            await newGoalSet.save();
            initOnGoalCreate(req.session.userId, newGoalSet);
            res.status(201).json(newGoalSet);
        }else{
            res.status(400).json({ msg: 'Active goal set already exists' });
        } 
    } catch (error) {
        res.status(500).json({ msg: 'Error creating goal set', error: error.message });
    }
}

module.exports = {
    getGoalSets,
    addGoalSet , 
    getCurrentGoalSet,
};