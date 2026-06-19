import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessagesThunk } from '../../store/slice/message/message.thunk.js';
import { TiMessages } from "react-icons/ti";
import Message from './Message.jsx';
import SendMessage from './SendMessage.jsx';

const NoChatSelected = () => {
    const user = useSelector((state) => state.userReducer.user);
    return (
        <div className="flex-1 flex flex-col items-center justify-center h-full bg-base-100 p-8 text-center">
            <div className="max-w-md flex flex-col items-center gap-6">
                <div className="p-6 rounded-full bg-primary/10 text-primary animate-pulse">
                    <TiMessages className="text-6xl" />
                </div>
                <div>
                    <h2 className="text-3xl font-extrabold text-base-content tracking-tight mb-2">
                        Welcome, {user?.fullName || "Guest"}! 👋
                    </h2>
                    <p className="text-base-content/60 text-lg">
                        Select a friend from the sidebar to start a real-time conversation.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 text-sm font-medium text-base-content/50 border border-base-300">
                    <span className="w-2 h-2 rounded-full bg-success animate-ping"></span>
                    Ready for connection
                </div>
            </div>
        </div>
    );
};

const MessageContainer = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.userReducer);
    const { messages, loading } = useSelector((state) => state.messageReducer);
    const messagesEndRef = useRef(null);

    // Fetch conversation messages from the database when selectedUser changes
    useEffect(() => {
        if (selectedUser?._id) {
            dispatch(getMessagesThunk(selectedUser._id));
            // Autofocus the input field for instant typing
            setTimeout(() => {
                document.getElementById("message-input")?.focus();
            }, 50);
        }
    }, [selectedUser?._id, dispatch]);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    if (!selectedUser) {
        return <NoChatSelected />;
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-base-100">
            {/* Header */}
            <div className="bg-base-200 px-4 py-2 mb-2 border-b border-base-300">
                <span className="label-text flex gap-3 items-center">
                    <div className="avatar">
                        <div className="ring-primary ring-offset-base-20 w-10 rounded-full ring-2 ring-offset-2">
                            <img
                                src={selectedUser?.avatar || `https://api.dicebear.com/10.x/thumbs/svg?seed=${selectedUser?.fullName || "User"}`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://api.dicebear.com/10.x/thumbs/svg?seed=${selectedUser?.fullName || "User"}`;
                                }}
                                alt="avatar"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <div className="flex justify-between items-center w-full">
                            <h4 className="font-bold text-base-content truncate line-clamp-1">{selectedUser?.fullName}</h4>
                            <span className="text-xs text-success font-semibold shrink-0 ml-2 text-nowrap" >Online</span>
                        </div>
                        <p className="text-sm text-base-content/70 truncate">@{selectedUser?.userName}</p>
                    </div>

                </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <span className="loading loading-spinner loading-lg text-primary"></span>
                    </div>
                ) : messages && messages.length > 0 ? (
                    messages.map((msg) => (
                        <Message key={msg._id} message={msg} />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full opacity-60 text-sm gap-2">
                        <p>No messages yet.</p>
                        <p className="text-xs text-base-content/50">Send a message to start the conversation!</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Send Message Input */}
            <SendMessage />
        </div>
    );
};

export default MessageContainer;
