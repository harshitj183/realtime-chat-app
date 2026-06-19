import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../../store/slice/user/user.slice";

const User = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((state) => state.userReducer);
    const isSelected = selectedUser?._id === user?._id;

    return (
        <div
            onClick={() => dispatch(setSelectedUser(user))}
            className={`flex gap-4 w-full border rounded-lg p-3 items-center cursor-pointer transition-all duration-200 ${isSelected
                    ? "bg-primary text-primary-content border-primary shadow-md scale-[1.02]"
                    : "bg-base-200 hover:bg-base-300 border-base-300"
                }`}
        >
            <div className="avatar">
                <div className={`w-12 h-12 rounded-full ring-2 ring-offset-2 ${isSelected ? "ring-primary-content ring-offset-primary" : "ring-primary ring-offset-base-200"
                    }`}>
                    <img
                        src={user?.avatar}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://api.dicebear.com/10.x/thumbs/svg?seed=${user?.fullName || "User"}`;
                        }}
                        alt="avatar"
                    />
                </div>
            </div>

            <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex justify-between items-center w-full">
                    <h4 className={`font-bold truncate line-clamp-1 ${isSelected ? "text-primary-content" : "text-base-content"
                        }`}>{user?.fullName}</h4>
                    <span className={`text-xs font-semibold shrink-0 ml-2 ${isSelected ? "text-primary-content/90" : "text-success"
                        }`}>Online</span>
                </div>
                <p className={`text-sm truncate ${isSelected ? "text-primary-content/80" : "text-base-content/70"
                    }`}>{user?.userName}</p>
            </div>
        </div>
    );
};

export default User;    