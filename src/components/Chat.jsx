import React, { useContext } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CallIcon from '@mui/icons-material/Call';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Messages from './Messages';
import Input from "./Input"
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';

const Chat = () => {

   
  const currentUser = useContext(AuthContext);
  //  console.log(chat)
  const {data} =useContext(ChatContext)
  console.log(data)


  return (

    currentUser &&
    <div className='chat'>
    <div className="chatInfo">
      <span className="chatName">
       {data?.user?.displayName}
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

export default Chat