const Message = require('../models/messageModel')

module.exports.addMessage = async(req, res, next) => {
    try{
        const {from, to, message} = req.body;
        const data = await Message.create({
            message: {text:message},
            users: [from, to],
            sender: from,
        });

        if(data) return res.status(200).json({msg: "Message added successfully."});
        return res.status(200).json({msg: "Failed to add."});
    }
    catch(error){
        next(error);
    }
}

module.exports.getAllMessage = async(req, res, next) => {
    
}