import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Mainform = () => {
    const navigate = useNavigate()
    const [error,setError] = useState("")
    const[data,setData] = useState({name:"",room:""})
    const Handlechange = (e)=>{
    
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }

    const validation = () => {
        if(!data.name){
            setError("Please  enter the name")
            return false;
        }
        if(!data.room){
            setError("Please select room")
            return false;
        }
        setError("")
        return true;
    }
     
    const submitHandler = (e)=>{
        e.preventDefault()
        const isvalidate = validation()
        if(isvalidate){
            navigate(`/chat/${data.room}`, {state:data})
        }

    }

  return (
    <div className='px-2 py-3 shadow bg-light text-dark border rounded row'>
        <form onSubmit={submitHandler}>
            <div className='form-group mb-4'>
                <h2 className='text-primary mb-4'>Welcome to Chatty</h2>
            </div>
            <div className='form-group mb-4'>
                <input type='text' className='form-control bg-light' name='name' placeholder='Enter your name' onChange={Handlechange}/>
            </div>
            <div className='form-group mb-4'>
                <select className='form-select bg-light' name='room' onChange={Handlechange}>
                    <option value=''>Select Room</option>
                    <option value='gaming'>Gaming</option>
                    <option value='coding'>Coding</option>
                    <option value='social media'>Social Media</option>
                </select>
            </div>
            <button type='submit' className='btn btn-warning w-100 mb-2' >Submit</button>
            {error ? <small className='text-danger'>{error}</small> : ""}
        </form>
      
    </div>
  )
}

export default Mainform
