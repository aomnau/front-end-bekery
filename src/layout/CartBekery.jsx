import axios from "axios";
import {useState} from "react";

export default function CartBekery() {
  const [input, setInput] = useState({
    title : '',
    dueDate : new Date()
  })

  const hdlChange = e => {
    setInput( prv => ( {...prv, [e.target.name] : e.target.value} ))
  }

  const hdlSubmit = async e => {
    try{
      e.preventDefault()
      const output = { ...input, dueDate: new Date(input.dueDate) }
      const token = localStorage.getItem('token')
      const rs = await axios.post('http://localhost:8000/todos', output, {
        headers : { Authorization : `Bearer ${token}`}
      })
      alert('Create new OK')
    }catch(err) {
      alert(err.message)
    }
  }

  return (
    <div style={{ marginTop: '100px'}}>ss</div>
  );
}