import axios from 'axios'
import {useState} from "react";
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

export default function LoginForm() {
  const { setUser } = useAuth()
  const [input, setInput] = useState({
    username : '', 
    password : ''
  })

  const hdlChange = e => {
    setInput( prv => ( { ...prv, [e.target.name] : e.target.value } ) )
  }

  const hdlSubmit = async e => {
    try {
      e.preventDefault()
 
      const rs = await axios.post('http://localhost:8000/auth/login', input)
      console.log(rs.data.token)
      localStorage.setItem('token', rs.data.token)
      const rs1 = await axios.get('http://localhost:8000/auth/me', {
        headers : { Authorization : `Bearer ${rs.data.token}` }
      })
      console.log(rs1.data)
      setUser(rs1.data)
      
    }catch(err) {
      console.log( err.message)
    }
  }

  return (
    <div style={{ backgroundColor: 'rgb(36,92,116)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div className="p-10 border w-1/5 min-w-[100px]  mx-auto items-center bg-white " style={{ borderRadius: '30px' }} >
      <div className="text-3xl mb-5 text-center">Login</div>
      <form className="flex flex-col gap-2 justify-center items-center " onSubmit={hdlSubmit}>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">username</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            name="username"
            value={input.username}
            onChange={ hdlChange }
          />
        </label>

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">password</span>
          </div>
          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            name="password"
            value={ input.password }
            onChange={ hdlChange }
          />
        </label>
          <button type="submit" className="btn btn-outline text-sky-500 border-sky-500  mt-7 w-full max-w-xs hover:bg-sky-500 hover:border-sky-500 hover:text-white">Login</button>
          <Link to="/register" className="btn btn-outline text-sky-500 border-sky-500  mt-1 w-full max-w-xs hover:bg-sky-500 hover:border-sky-500 hover:text-white">Sing up</Link>
      </form>
    </div>
    </div>
  );
}