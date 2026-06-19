import React, { useEffect, useState } from 'react';
import { IoSearch, IoLogOut, IoSettingsOutline } from 'react-icons/io5';

import User from './User.jsx';
import EditProfileModal from './EditProfileModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk, getOtherUsersThunk } from '../../store/slice/user/user.thunk.js';
import { useNavigate } from 'react-router-dom';

const UserSidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.userReducer.user);
    const { otherUsers } = useSelector((state) => state.userReducer);
    const [searchQuery, setSearchQuery] = useState("");
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    console.log("other", otherUsers)

    useEffect(() => {
        dispatch(getOtherUsersThunk());
    }, [dispatch]);

    const handleLogout = async () => {
        await dispatch(logoutUserThunk())
        navigate('/login')
    }

    const filteredUsers = otherUsers?.filter((u) => 
        u?.fullName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u?.userName?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="w-64 bg-base-200 h-full border-r border-base-300 flex flex-col overflow-hidden">
            {/* User Sidebar Content */}
            <div className="p-4 font-bold text-lg border-b border-base-300">
                Real-Time Chat
            </div>
            <div className='flex gap-2 px-2 py-2'>
                <input 
                    placeholder='Search' 
                    type='text' 
                    className='input input-bordered w-full'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className='btn btn-neutral'><IoSearch /></button>

            </div>
            <div className="bg-base-200 w-full p-2 rounded-box flex-1 overflow-y-auto min-h-0 flex flex-col gap-2">
                {filteredUsers?.map((u) => (
                    <User key={u._id} user={u} />
                ))}
            </div>

            <hr className="border-base-300" />

            <div>
                {/* user profile in bottom */}
                <div className="flex items-center gap-2 bg-base-200 p-3 rounded-t-lg">
                    <div className="avatar">
                        <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-200 ring-offset-2">
                            <img 
                                src={user?.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullName || "User"}`} 
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullName || "User"}`;
                                }}
                                alt="avatar" 
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="font-semibold text-base-content truncate line-clamp-1">{user?.fullName || "User"}</p>
                        <p className="text-sm text-base-content/70 truncate">@{user?.userName}</p>
                    </div>
                    <button onClick={() => setIsProfileModalOpen(true)} className='btn btn-ghost btn-circle btn-sm shrink-0'>
                        <IoSettingsOutline className="text-lg" />
                    </button>
                    <button onClick={handleLogout} className='btn btn-ghost btn-circle btn-sm shrink-0'>
                        <IoLogOut className="text-lg text-error" />
                    </button>
                </div>
            </div>

            <EditProfileModal isOpen={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)} />
        </div >
    );
};

export default UserSidebar;
