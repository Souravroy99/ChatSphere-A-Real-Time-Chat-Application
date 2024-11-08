const User = require('../models/userModel');
const bcrypt = require('bcrypt');


const register = async(req, res, next) => {
    try{   
        const response = req.body;
 
        const userNameCheck = await User.findOne({username: response.username});
        const emailCheck = await User.findOne({email: response.email});

        if(userNameCheck) {
            return res.status(400).json({msg: "Username already used"});
        }
        if(emailCheck) {
            return res.status(400).json({msg: "Email already used"});
        }

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(response.password, saltRound);

        const createdUser = await User.create({
            username: response.username,
            email: response.email,
            password: hashPassword,
        })
        
        delete createdUser.password;
        return res.status(200).json({createdUser});
    }
    catch(error){
        next(error);
    }
} 

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const isUserExists = await User.findOne({ username }).lean();
        if (!isUserExists) {
            return res.status(400).json({ msg: "Invalid Credentials!" });
        }

        const isValidPassword = await bcrypt.compare(password, isUserExists.password);
        if (!isValidPassword) {
            return res.status(400).json({ msg: "Invalid Credentials!" });
        }

        delete isUserExists.password;

        return res.status(200).json({ loginUser: isUserExists });
    } 
    catch (error) {
        next(error);
    }
};


const setAvatar = async(req,res,next) => {
    try{
        const userId = req.params.id ;
        const avatarImage = req.body.image; 
        const userData = await User.findByIdAndUpdate(userId, {isAvatarImageSet: true, avatarImage});

        return res.status(200).json({isSet: userData.isAvatarImageSet, image: userData.avatarImage});
    }   
    catch(error){ 
        next(error); 
    }
}

const getAllUsers = async(req,res,next) => {
    try{
        const id = req.params.id;
        const allUsers = await User.find({_id: {$ne: id}}).select(["email", "username", "avatarImage", "_id"]) ; 

        return res.status(200).json({allUsers});
    }
    catch(error){
        next(error);
    }
}

module.exports = {register, login, setAvatar, getAllUsers};