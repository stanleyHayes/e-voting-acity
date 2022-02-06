import jwt from "jsonwebtoken";
import Admin from "../../../models/v1/admin.js";
import validator from "validator";

const authenticate = async (req, res, next) => {
    try {
        if(!req.headers || !req.headers['authorization'])
            return res.status(400).json({message: 'Authorization required'});
        const [bearer, token] = req.headers['authorization'].split(' ');
        if(!validator.isJWT(token)) return res.status(400).json({message: 'Invalid Token'});
        if(!bearer) return res.status(400).json({message: 'Invalid header format'});
        if(!token) return res.status(400).json({message: 'Token required'});
        const decoded = jwt.verify(token, process.env.JWT_SECRET, null, null);
        const admin = await Admin.findOne({_id: decoded._id, "devices.token": token});
        if(!admin) return res.status(401).json({message: 'Session Expired'});
        req.admin = admin;
        req.token = token;
        next();
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}

export default authenticate;
