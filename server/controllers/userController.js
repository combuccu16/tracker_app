const User = require("../models/userModel")
async function getCoins(req, res) {
  try {
    const user = await User.findById(req.session.userId);
    
    res.json({ coins: user.coins });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

async function getFullName(req, res) {
  try {

    res.json({ name: req.session.name, lastname: req.session.lastname });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
}

async function getOwnedAnimations(req, res) {
  try {
    const user = await User.findById(req.session.userId);

    res.json({ animations: user.purchasedAnimations });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}


async function getOwnedIdioms(req, res) {
  try {
    const user = await User.findById(req.session.userId);;

    res.json({ idioms: user.purchasedIdioms });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function getOwnedCharacters(req, res) {
  try {
    const user = await User.findById(req.session.userId);


    res.json({ characters: user.purchasedCharacters });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function getEquippedAnimation(req, res) {
  try {
    const user = await User.findById(req.session.userId);
    res.json({ animation: user.equipped.animation });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function getEquippedCharacter(req, res) {
  try {
    const user = await User.findById(req.session.userId);

    res.json({ character: user.equipped.character });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function getEquippedIdiom(req, res) {
  try {
    const user = await User.findById(req.session.userId);

    res.json({ idiom: user.equipped.idiom });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = {
    getCoins , 
    getFullName , 
    getOwnedAnimations , 
    getOwnedCharacters , 
    getOwnedIdioms ,
    getEquippedAnimation , 
    getEquippedCharacter , 
    getEquippedIdiom
}
