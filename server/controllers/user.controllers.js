import User from "../models/user.model.js";
import asyncHandler from "../utilities/asyncHandler.utility.js";
import Errorhandler from "../utilities/errorHandler.utility.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const sanitizeAvatar = (avatarUrl, userName) => {
    if (!avatarUrl || avatarUrl.includes("avatar.iran.liara.run")) {
        return `https://api.dicebear.com/7.x/thumbs/svg?seed=${userName}`;
    }
    return avatarUrl;
};

export const signup = asyncHandler(async (req, res, next) => {
    const { fullName, password, gender, avatar } = req.body;
    const userName = req.body.userName || req.body.username;

    if (!fullName || !userName || !password || !gender) {
        return next(new Errorhandler("All fields are required", 400));
    }

    const user = await User.findOne({ userName });
    if (user) {
        return next(new Errorhandler("User already exists", 400));
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAvatar = `https://api.dicebear.com/7.x/thumbs/svg?seed=${userName}`;

    const newUser = await User.create({ fullName, userName, password: hashedPassword, gender, avatar: newAvatar });
    if (!newUser) {
        return next(new Errorhandler("Failed to create user", 400));
    }
    const tokenData = {
        _id: newUser._id,
        userName: newUser.userName,
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

    const sanitizedUser = newUser.toObject();
    sanitizedUser.avatar = sanitizeAvatar(sanitizedUser.avatar, sanitizedUser.userName);

    res.status(200).cookie("jwt", token, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !== "development" }).json({
        success: true,
        message: "User created successfully",
        user: sanitizedUser,
        token
    })
});

export const login = asyncHandler(async (req, res, next) => {
    const { password } = req.body;
    const userName = req.body.userName || req.body.username;

    if (!userName || !password) {
        return next(new Errorhandler("All fields are required", 400));
    }
    const user = await User.findOne({ userName })
    if (!user) {
        return next(new Errorhandler("User not found", 404));
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return next(new Errorhandler("Invalid password", 401));
    }

    const tokenData = {
        _id: user._id,
        userName: user.userName,
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });

    const sanitizedUser = user.toObject();
    sanitizedUser.avatar = sanitizeAvatar(sanitizedUser.avatar, sanitizedUser.userName);

    res.status(200).cookie("jwt", token, { maxAge: 2 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !== "development" }).json({
        success: true,
        message: "User logged in successfully",
        user: sanitizedUser,
        token
    })
});

export const getProfile = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        return next(new Errorhandler("User not found", 404));
    }
    const sanitizedUser = req.user.toObject();
    sanitizedUser.avatar = sanitizeAvatar(sanitizedUser.avatar, sanitizedUser.userName);
    res.status(200).json({
        success: true,
        user: sanitizedUser
    });
});

export const logout = asyncHandler(async (req, res, next) => {
    res.status(200).cookie("jwt", "", { maxAge: 0, httpOnly: true, sameSite: "strict", secure: process.env.NODE_ENV !== "development" }).json({
        success: true,
        message: "User logged out successfully"
    });
});

export const getOtherUsers = asyncHandler(async (req, res, next) => {
    const users = await User.find({ _id: { $ne: req.user._id } });
    const sanitizedUsers = users.map(u => {
        const obj = u.toObject();
        obj.avatar = sanitizeAvatar(obj.avatar, obj.userName);
        return obj;
    });
    res.status(200).json({
        success: true,
        users: sanitizedUsers
    });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
    const { fullName, gender, avatar } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
        return next(new Errorhandler("User not found", 404));
    }
    if (fullName) user.fullName = fullName;
    if (gender) user.gender = gender;
    if (avatar) user.avatar = avatar;

    await user.save();

    const sanitizedUser = user.toObject();
    sanitizedUser.avatar = sanitizeAvatar(sanitizedUser.avatar, sanitizedUser.userName);

    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: sanitizedUser
    });
});