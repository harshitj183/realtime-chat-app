import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessageThunk } from "../../store/slice/message/message.thunk";
import { IoIosSend } from "react-icons/io";

const SendMessage = () => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.userReducer);
    const [message, setMessage] = useState("");

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!message.trim() || !selectedUser?._id) return;
        dispatch(sendMessageThunk({ id: selectedUser._id, message }));
        setMessage("");
    };

    return (
        <form onSubmit={handleSendMessage} className="w-full p-3 flex gap-2">
            <input
                id="message-input"
                type="text"
                placeholder="Type here..."
                className="input input-bordered input-primary w-full"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-square btn-primary" disabled={!message.trim()}>
                <IoIosSend className="text-xl" />
            </button>
        </form>
    );
};

export default SendMessage;
