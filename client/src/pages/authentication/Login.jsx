import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { loginUserThunk } from '../../store/slice/user/user.thunk'

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    })

    const handleInputChange = (e) => {
        setLoginData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleLogin = async () => {
        if (!loginData.username || !loginData.password) {
            toast.error("Please fill in all fields")
            return
        }
        const response = await dispatch(loginUserThunk(loginData))
        if (response.meta.requestStatus === 'fulfilled') {
            navigate('/home');
        }
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4 gap-4 w-full">
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="w-full flex justify-center">
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-6 shadow-lg">
                    <legend className="fieldset-legend text-lg font-bold">Login</legend>

                    <input name="username" type="text" className="input input-bordered w-full" placeholder="username" value={loginData.username} onChange={handleInputChange} />

                    <input name="password" type="password" className="input input-bordered w-full" placeholder="Password" value={loginData.password} onChange={handleInputChange} />

                    <button type="submit" className="btn btn-neutral w-full mt-6">Login</button>
                </fieldset>
            </form>

            <p className="text-sm text-base-content/80"> don't have an account?  &nbsp; <Link className='text-blue-400 underline' to="/signup">Signup</Link> </p>
        </div>
    )
}

export default Login