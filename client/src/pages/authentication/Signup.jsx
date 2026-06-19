import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signupUserThunk } from '../../store/slice/user/user.thunk'
import { toast } from 'react-hot-toast'

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmpassword: "",
        gender: "male"
    })

    const handleInputChange = (e) => {
        setSignupData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSignup = async () => {
        const { fullName, username, password, confirmpassword, gender } = signupData;
        if (!fullName || !username || !password || !confirmpassword || !gender) {
            toast.error("All fields are required");
            return;
        }
        if (password !== confirmpassword) {
            toast.error("Passwords do not match");
            return;
        }
        const response = await dispatch(signupUserThunk({ fullName, username, password, gender }));
        if (response.meta.requestStatus === 'fulfilled') {
            navigate('/home');
        }
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4 w-full">
            <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }} className="w-full flex justify-center">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6 shadow-lg">
                    <legend className="fieldset-legend text-lg font-bold">signup</legend>

                    <input name="fullName" type="text" className="input input-bordered w-full" placeholder="Full name" value={signupData.fullName} onChange={handleInputChange} />

                    <input name="username" type="text" className="input input-bordered w-full" placeholder="username" value={signupData.username} onChange={handleInputChange} />

                    <input name="password" type="password" className="input input-bordered w-full" placeholder="Password" value={signupData.password} onChange={handleInputChange} />

                    <input name="confirmpassword" type="password" className="input input-bordered w-full" placeholder="confirm Password" value={signupData.confirmpassword} onChange={handleInputChange} />

                    <div className="flex gap-4 mt-2 justify-around w-full">
                        <label className="flex items-center gap-2 cursor-pointer label">
                            <span className="label-text">Male</span>
                            <input 
                                type="radio" 
                                name="gender" 
                                value="male" 
                                className="radio radio-primary" 
                                checked={signupData.gender === "male"} 
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
                                checked={signupData.gender === "female"} 
                                onChange={handleInputChange} 
                            />
                        </label>
                    </div>

                    <button type="submit" className="btn btn-neutral w-full mt-6">Signup</button>
                </fieldset>
            </form>

            <p className="text-sm text-base-content/80"> do you have an account?  &nbsp; <Link className='text-blue-400 underline' to="/login">Login</Link> </p>
        </div>
    )
}

export default Signup