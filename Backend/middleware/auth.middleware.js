const userModel = require('../models/user.model');
const blacklistedTokenModel = require('../models/blacklistToken.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');    

module.exports.authUser = async (req, res, next) => {
    const token=req.cookies?.token || req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({message:'Unauthorized token not found'});
    }

    const blacklistedToken = await blacklistedTokenModel.findOne({ token: token });
    if (blacklistedToken) {
        return res.status(401).json({ message: 'Unauthorized token blacklisted' });
    }   
     
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized user not found' });
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}