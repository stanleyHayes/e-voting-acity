import jwt from "jsonwebtoken";
import User from "../../../models/v1/user.js";

const authenticate = async (req, res, next) => {
    try {
        if(!req.headers || !req.headers['authorization'])
            return res.status(400).json({message: 'Authorization required'});
        const [bearer, token] = req.headers['authorization'].split(' ');
        if(!bearer) return res.status(400).json({message: 'Invalid header format'});
        if(!token) return res.status(400).json({message: 'Token required'});
        const decoded = jwt.verify(token, process.env.JWT_SECRET, null, null);
        const user = await User.findOne({_id: decoded._id, "devices.token": token});
        if(!user) return res.status(401).json({message: 'Session Expired'});
        req.user = user;
        req.token = token;
        next();
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}

export default authenticate;
