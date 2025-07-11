const Animation = require('../models/animationModel');
const Idiom = require('../models/idiomsModel');
const User = require('../models/userModel');
async function buy(req , res){
    const userId = req.session.userId
    const {itemId , type} = req.query;
    try {   
        if(type === "animation"){
            const animation = await Animation.findById(itemId);
            const user = await User.findById(userId);
            if(user.ownedAnimations.includes(animation._id)) {
                return res.status(400).json({message: 'Animation already owned'});
            }
            if(user.coins < animation.price) {
                return res.status(400).json({message: 'Not enough coins'});
            }
            user.coins -= animation.price;
            user.ownedAnimations.push(animation._id);
            await user.save();
        }else if(type === "idiom"){
            const idiom = await Idiom.findById(itemId);
            const user = await User.findById(userId);
            if(user.ownedIdioms.includes(idiom._id)) {
                return res.status(400).json({message: 'Idiom already owned'});
            }
            if(user.coins < idiom.price) {
                return res.status(400).json({message: 'Not enough coins'});
            }
            user.coins -= idiom.price;
            user.ownedIdioms.push(idiom._id);
            await user.save();
        }else{
            return res.status(400).json({message: 'Invalid item type'});
        }
    } catch (error) {
        console.error('Error during purchase:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

async function getOwnedItems(req, res) {
    const userId = req.session.userId;
    const {type} = req.query;
    try {
        const user = await User.findById(userId).populate('ownedAnimations ownedIdioms');
        if (type === "animation") {
            const ownedAnimations = user.ownedAnimations.map(animation => ({
                id: animation._id,
                name: animation.name,
                price: animation.price,
                image: animation.image
            }));
            res.status(200).json({ ownedItems: ownedAnimations });
        } else if (type === "idiom") {
            const ownedIdioms = user.ownedIdioms.map(idiom => ({
                id: idiom._id,
                name: idiom.name,
                price: idiom.price,
                image: idiom.image
            }));
            res.status(200).json({ ownedItems: ownedIdioms });
        } else {
            return res.status(400).json({ message: 'Invalid item type' });
        }
    } catch (error) {
        console.error('Error fetching owned items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
module.exports = {
    buy , getOwnedItems
};