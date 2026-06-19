import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import asyncHandler from "../utilities/asyncHandler.utility.js";
import Errorhandler from "../utilities/errorHandler.utility.js";



export const sendMessage = asyncHandler(async (req, res, next) => {
    const myid = req.user._id;
    const otherParticipantId = req.params.id;
    const { message } = req.body;
    if (!message) {
        return next(new Errorhandler("All fields are required", 400));
    }
    let conversation = await Conversation.findOne({
        participants: {
            $all: [myid, otherParticipantId]
        }
    });

    if (!conversation) {
        conversation = await Conversation.create({
            participants: [myid, otherParticipantId],
        });
    }

    const newMessage = await Message.create({
        senderId: myid,
        receiverId: otherParticipantId,
        message
    });

    if (newMessage) {
        conversation.messages.push(newMessage._id);
        await conversation.save();
    }

    //socket.io

    res.status(200).json({
        success: true,
        message: "Message sent successfully",
        responseData: newMessage
    });
});

export const getMessages = asyncHandler(async (req, res, next) => {
    const myid = req.user._id;
    const otherParticipantId = req.params.id;

    const conversation = await Conversation.findOne({
        participants: {
            $all: [myid, otherParticipantId]
        }
    }).populate("messages");

    if (!conversation) {
        return res.status(200).json({
            success: true,
            messages: []
        });
    }

    res.status(200).json({
        success: true,
        messages: conversation.messages
    });
});
