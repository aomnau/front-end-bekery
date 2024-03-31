import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function RegisterForm() {
    const [input, setInput] = useState({
        firstName: '',
        lastName:'',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: ''
    })

    const hdlChange = e => {
        setInput(prv => ({ ...prv, [e.target.name] : e.target.value }))
    }

    const hdlSubmit = async e => {
        try {
            e.preventDefault()

            if (input.password !== input.confirmPassword) {
                return alert('Please check confirm password')
            }
            const rs = await axios.post('http://localhost:8000/auth/register', input)
            console.log(rs)
            if (rs.status === 200) {
                alert('Register Successful')
            }
    } catch(err){
        console.log(err.message)
    }
}

    return (
        <div style={{ backgroundColor: 'rgb(36,92,116)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="p-4 border w-2/6 min-w-[100px] mx-auto    items-center bg-white " style={{ borderRadius: '30px' }} >
            <div className="text-3xl mb-6 text-center" >Sign up</div>
            <form className="flex flex-col gap-2 justify-center items-center" onSubmit={hdlSubmit}>
            <label className="form-control w-full max-w-md ">
                    <div className="label">
                        <span label-text>First Name</span>
                    </div>
                    <input
                        type="text"
                        placeholder="first name"
                        className="input input-bordered w-full "
                        name="firstName"
                        value={input.firstName}
                        onChange={hdlChange}
                    />
                </label>
            <label className="form-control w-full max-w-md ">
                    <div className="label">
                        <span label-text>Last Name</span>
                    </div>
                    <input
                        type="text"
                        placeholder="last name"
                        className="input input-bordered w-full "
                        name="lastName"
                        value={input.lastName}
                        onChange={hdlChange}
                    />
                </label>
                <label className="form-control w-full max-w-md">
                    <div className="label">
                        <span label-text>Phone</span>
                    </div>
                    <input
                        type="number"
                        placeholder="phone"
                        className="input input-bordered w-full "
                        name="phone"
                        value={input.phone}
                        onChange={hdlChange}
                    />
                </label>
                <label className="form-control w-full max-w-md">
                    <div className="label">
                        <span label-text>Email</span>
                    </div>
                    <input
                        type="email"
                        placeholder="email"
                        className="input input-bordered w-full "
                        name="email"
                        value={input.email}
                        onChange={hdlChange}
                    />
                </label>
                <label className="form-control w-full max-w-md">
                    <div className="label">
                        <span label-text>Username</span>
                    </div>
                    <input
                        type="text"
                        placeholder="username"
                        className="input input-bordered w-full "
                        name="username"
                        value={input.username}
                        onChange={hdlChange}
                    />
                </label>
                <label className="form-controll w-full max-w-md">
                    <div className="label">
                        <span className="label-text">Password</span>
                    </div>
                    <input
                        type="password"
                        placeholder="password"
                        className="input input-bordered w-full "
                        name="password"
                        value={input.password}
                        onChange={hdlChange}
                    />
                </label>
                <label className="form-controll w-full max-w-md">
                    <div className="label">
                        <span className="label-text">Confirm Password</span>
                    </div>
                    <input
                        type="password"
                        placeholder="confirm password"
                        className="input input-bordered w-full "
                        name="confirmPassword"
                        value={input.confirmPassword}
                        onChange={hdlChange}
                    />
                </label>
                <button type="submit" className="btn btn-outline text-sky-500 border-sky-500  mt-7 w-full max-w-md hover:bg-sky-500 hover:border-sky-500 hover:text-white">Sign up</button>
                <Link to="/" className="text-sky-500 mt-3 hover:underline">Already have an account? Login here</Link>
            </form>
        </div>
        </div>
    )
}