import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Moment from "react-moment"
import {io} from "socket.io-client"

const Chatroom = () => {
    const location = useLocation()
    

    const [data,setData] = useState({})
    const [msg,setMsg] = useState("")
    const [allmsg,setallMsg] = useState([])
    const [socket,setSocket] = useState()

    useEffect(()=>{
        const socket = io("http://localhost:8000/");
        setSocket(socket)

        socket.on("connect", () => {
            socket.emit("joinroom",location.state.room)
          });
          
    },[])

    useEffect(()=>{
        if(socket){
            socket.on("getnewmsg",newmsg =>{
                setallMsg([...allmsg,newmsg])
              
                setMsg("")
            })
        }
    },[socket,allmsg])

    useEffect(()=> {
        setData(location.state)
    },[location])

    const inputHandler = (e) => setMsg(e.target.value)
    const forentersent = (e) => e.keyCode === 13 ? submitHandler() : ""

    const submitHandler = (e) =>{
        if(msg){
            const newmsg = {time: new Date(),msg:msg , name: data.name}
            socket.emit("newmsg",{newmsg,room: data.room})
        }
        
        
    }
    


  return (
    <div className='py-3 m-5 w-50  shadow bg-white text-dark border rounded container' style={{height:"550px"}}>
      <div className='text-center px-3 mb-3  text-capitalize  text-primary'>
          <h1>{data.room}</h1>
      </div>
      <div className='bg-light border rounded p-3 mb-4' style={{height:'385px', overflowY:'scroll'}}>

            {
                allmsg.map(newmsg =>{
                    return data.name === newmsg.name
                    ?

                    <div className='row justify-content-end  pl-5'>
                        <div className='d-flex flex-column align-items-end m-2 shadow p-2 bg-info border rounded w-auto'>
                            <div>
                                <strong className='m-1'>You</strong>
                                <small className='text-muted'><Moment fromNow>{newmsg.time}</Moment></small>
                            </div>
                            <h4 className='m-1'>{newmsg.msg}</h4>
                        </div>

                    </div>

                    :

                    <div className='row justify-content-start'>
                        <div className='d-flex flex-column  m-2 p-2 shadow bg-white border rounded w-auto'>
                            <div>
                                <strong className='m-1'>{newmsg.name}</strong>
                                <small className='text-muted'><Moment fromNow>{newmsg.time}</Moment></small>
                            </div>
                            <h4 className='m-1'>{newmsg.msg}</h4>
                        </div>
                    </div>


                })
            }
                 
        </div>
         
        <div className='form-group d-flex'>
            <input type='text' className='form-control bg-light' name='message' placeholder='Type your message here'value={msg} onChange={inputHandler} onKeyDown={forentersent}/>
            <button type='button' className='btn btn-warning mx-2' onClick={submitHandler} >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
                        </svg>
            </button>
        </div>
    </div>
    
  )
}

export default Chatroom
