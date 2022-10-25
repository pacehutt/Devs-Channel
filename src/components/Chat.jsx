import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';
import CallIcon from '@mui/icons-material/Call';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Messages from './Messages';
import Input from "./Input"

const chat = () => {
  return (
    <div className='chat'>
    <div className="chatInfo">
      <span className="chatName">
        Jane
      </span>
       
       <div className="chatIcons">
          <CallIcon sx={{width:"20px", color:"rgb(24, 24, 24)"}}></CallIcon>
          <PersonAddIcon sx={{width:"20px", color:"rgb(24, 24, 24)"}}></PersonAddIcon>
          <MoreVertIcon sx={{width:"20px", color:"rgb(24, 24, 24)"}}></MoreVertIcon>

       </div>
    </div>
     <Messages>

     </Messages>
     <Input></Input>

    </div>
  )
}

export default chat