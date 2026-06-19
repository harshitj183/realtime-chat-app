import jwt from "jsonwebtoken";
import Errorhandler from "../utilities/errorHandler.utility.js";
import User from "../models/user.model.js";

export const isAuthenticated = async (req, res, next) => {
    try {
        const { jwt: token } = req.cookies;
        
        if (!token) {
            return next(new Errorhandler("Please login to access this resource", 401));
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.findById(decodedData._id);
        
        next();
    } catch (error) {
        return next(new Errorhandler("Invalid or expired token", 401));
    }
};
