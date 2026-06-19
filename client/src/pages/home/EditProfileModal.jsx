import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileThunk } from "../../store/slice/user/user.thunk.js";

const EditProfileModal = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const { user, buttonLoading } = useSelector((state) => state.userReducer);

    const [formData, setFormData] = useState({
        fullName: user?.fullName || "",
        gender: user?.gender || "male",
        avatarSeed: user?.avatar?.split("seed=")[1] || user?.userName || ""
    });

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const avatarUrl = `https://api.dicebear.com/7.x/thumbs/svg?seed=${formData.avatarSeed || user?.userName}`;
        const response = await dispatch(updateProfileThunk({
            fullName: formData.fullName,
            gender: formData.gender,
            avatar: avatarUrl
        }));
        if (response.meta.requestStatus === "fulfilled") {
            onClose();
        }
    };

    return (
        <div className="modal modal-open">
            <div className="modal-box relative border border-base-300 shadow-2xl">
                <button type="button" onClick={onClose} className="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
                <h3 className="font-bold text-lg mb-4 text-base-content">Edit Profile Settings</h3>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Preview Avatar */}
                    <div className="flex flex-col items-center gap-2 mb-2">
                        <div className="avatar">
                            <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img 
                                    src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${formData.avatarSeed || user?.userName}`} 
                                    alt="avatar-preview" 
                                />
                            </div>
                        </div>
                        <span className="text-xs text-base-content/50">Avatar Preview</span>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Full Name</span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="input input-bordered w-full"
                            required
                        />
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold">Avatar Seed (Style customized)</span>
                        </label>
                        <input
                            type="text"
                            name="avatarSeed"
                            value={formData.avatarSeed}
                            onChange={handleInputChange}
                            placeholder="e.g. happy, coder, active"
                            className="input input-bordered w-full"
                        />
                        <span className="text-xs text-base-content/40 mt-1">Type anything to generate a custom DiceBear avatar!</span>
                    </div>

                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-semibold text-nowrap">Gender</span>
                        </label>
                        <div className="flex gap-4 justify-around mt-1">
                            <label className="flex items-center gap-2 cursor-pointer label">
                                <span className="label-text">Male</span>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    className="radio radio-primary"
                                    checked={formData.gender === "male"}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer label">
                                <span className="label-text">Female</span>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    className="radio radio-primary"
                                    checked={formData.gender === "female"}
                                    onChange={handleInputChange}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="modal-action mt-6">
                        <button type="button" onClick={onClose} className="btn btn-outline btn-ghost">Cancel</button>
                        <button type="submit" className="btn btn-primary" disabled={buttonLoading}>
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfileModal;
