import React from "react";
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    if (!message) return null;
    const { user, selectedUser } = useSelector((state) => state.userReducer);
    const fromMe = message.senderId === user?._id;

    const chatClass = fromMe ? "chat chat-end" : "chat chat-start";
    const bubbleClass = fromMe 
        ? "chat-bubble chat-bubble-primary" 
        : "chat-bubble bg-base-300 text-base-content";
    const avatar = fromMe ? user?.avatar : selectedUser?.avatar;
    const name = fromMe ? "You" : selectedUser?.fullName;

    const formattedTime = message.createdAt ? new Date(message.createdAt).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }) : "";

    const fallbackAvatar = `https://api.dicebear.com/10.x/thumbs/svg?seed=${name || "User"}`;

    return (
        <div className={chatClass}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img 
                        src={avatar || fallbackAvatar} 
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = fallbackAvatar;
                        }}
                        alt="avatar" 
                    />
                </div>
            </div>
            <div className="chat-header text-xs opacity-60 mb-1">
                {name} <time className="text-xs opacity-40 ml-1">{formattedTime}</time>
            </div>
            <div className={bubbleClass}>{message.message}</div>
            <div className="chat-footer opacity-50 text-xs mt-1">
                {fromMe ? "Sent" : ""}
            </div>
        </div>
    );
};

export default Message; 