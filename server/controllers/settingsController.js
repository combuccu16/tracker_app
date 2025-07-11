const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const {isValidName , validatePassword} = require("../helpers/validate")

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id); 
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password' });
    }
    // 3. Hash the new password
    const {valid : newPassword , errors : errors} = validatePassword(newPassword)
    if(!newPassword){
      return res.status(401).json({message : "wrong password format" , errors})
    }
    const hashedNewPassword = bcrypt.hash(newPassword , 10)
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const changeName = async (req, res) => {
  
  try {
    const { newName } = req.body;
    const {sanitized : validName , errors : errors} = isValidName(newName);
    if (!validName) {
      return res.status(400).json({ ok : false , message: 'Invalid name' , errors });
    }
    console.log("before savbing name " , req.session)
    const user = await User.findById(req.session.userId); 

    user.name = validName;

    await user.save();

    res.json({ok : true ,  message: 'Name updated successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change Last Name
const changeLastName = async (req, res) => {
  
  try {
    const { newLastName } = req.body;
    const {sanitized : validLastName , errors : errors} = isValidName(newLastName);
  
    if (!validLastName) {
      return res.status(400).json({ message: 'Invalid lastname' , errors});
    }
    const user = await User.findById(req.session.userId);

    user.lastname = validLastName;
    await user.save();

    res.json({ message: 'Last name updated successfully' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  changePassword,
  changeName,
  changeLastName
};
