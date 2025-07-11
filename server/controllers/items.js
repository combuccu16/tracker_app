const User = require('../models/userModel');
const Animation = require('../models/animationModel');
const Character = require('../models/characterModel');
const Idiom = require('../models/idiomsModel');
async function equip(req, res) {
    const  userId  = req.session.userId
    const { itemId , type} = req.body;
    try {
        const user = await User.findById(userId);
        const item = null;
        if (type === "animation") {
            user.equippedAnimation = itemId;
        } else if (type === "idiom") {
            user.equippedIdiom = itemId;
        }
         else {
            user.equippedCharacter = itemId;
        }

        await user.save();
        res.status(200).json({ message: 'Item equipped successfully' , item : item });
    } catch (error) {
        console.error('Error equipping item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getEquippedItems(req, res) {
    const userId = req.session.userId;
    try {
        const user = await User.findById(userId).populate('equippedAnimation equippedIdiom equippedCharacter');
        res.status(200).json({
            equippedAnimation: user.equippedAnimation,
            equippedIdiom: user.equippedIdiom,
            equippedCharacter: user.equippedCharacter
        });
    } catch (error) {
        console.error('Error fetching equipped items:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

async function getAnimations(req , res) {
    try {
        console.log("get animation , "  ,req.session)
        // we need to fetch all animations from the database then check if the user has purchased them
        // and return the list of animations with their purchase status
        const animations = await Animation.find();
        const user = await User.findById(req.session.userId);
        const purchasedAnimationIds = user.purchasedAnimations.map(anim => anim._id.toString());

        const animationsWithStatus = animations.map(anim => ({
            ...anim._doc,
            isPurchased: purchasedAnimationIds.includes(anim._id.toString())
        }));

        res.status(200).json(animationsWithStatus);
    } catch (error) {
        console.error('Error fetching animations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function getIdioms(req , res) {
    try {
        // we need to fetch all idioms from the database then check if the user has purchased them
        // and return the list of idioms with their purchase status
        const idioms = await Idiom.find();
        const user = await User.findById(req.session.userId);
        const purchasedIdiomIds = user.purchasedIdioms.map(idiom => idiom._id.toString());

        const idiomsWithStatus = idioms.map(idiom => ({
            ...idiom._doc,
            isPurchased: purchasedIdiomIds.includes(idiom._id.toString())
        }));

        res.status(200).json(idiomsWithStatus);
    } catch (error) {
        console.error('Error fetching idioms:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function getCharacters(req, res) {
    try {
        // Fetch all characters from the database and check if the user has purchased them
        const characters = await Character.find();
        const user = await User.findById(req.session.userId);
        const purchasedCharacterIds = user.purchasedCharacters.map(char => char._id.toString());
        const charactersWithStatus = characters.map(char => ({
            ...char._doc,
            isPurchased: purchasedCharacterIds.includes(char._id.toString())
        }));
        console.log(charactersWithStatus)
        res.status(200).json(charactersWithStatus);
    } catch (error) {
        console.error('Error fetching characters:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
async function buyItem(req , res){
    const userId  = req.session.userId
    const { itemId , type} = req.body;
    try {
        const user = await User.findById(userId);
        let item = null 
        if (type === "animation") {
            item = await Animation.findById(itemId)
            if(item.price > user.coins){
                return  res.status(400).json({ok : false , message : "coins are not enough"})
             }
             user.purchasedAnimations.push(item._id)
             user.coins -= item.price
        } else if (type === "idiom") {
             item = await Idiom.findById(itemId)
             if(item.price > user.coins){
                 return res.status(400).json({ok : false , message : "coins are not enough"})
             }
             user.purchasedIdioms.push(item._id)
             user.coins -= item.price
        }
         else {
             item = await Character.findById(itemId)
             console.log(item)
             if(item.price > user.coins){
                return res.status(400).json({ok : false , message : "coins are not enough"})
             }
             user.purchasedCharacters.push(item._id)
             user.coins -= item.price
        }
        
        await user.save();
        res.status(200).json({ ok : true , message: 'Item bought successfully' , item : item });
    } catch (error) {
        console.error('Error purchasing item:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

module.exports = {
    equip,
    getEquippedItems,
    getAnimations,
    getIdioms,
    getCharacters ,
    buyItem 
};