import React from 'react'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SendIcon from '@mui/icons-material/Send';


const Input = () => {
  return (
    <div className='input'>
        <input type="text" className="msg-input" placeholder='Type something..'/>
        <div className="send">
          <img src="" alt="" />
          <input type="file" style={{display:'none'}} id="file" accept="image/*"/>
          <label htmlFor="file">
            <PhotoCameraIcon sx={{color:"#F56A4D"}}></PhotoCameraIcon>
          </label>
          <button>
            <SendIcon sx={{color:"#F56A4D", backgroundColor:"transparent"}}></SendIcon>
          </button>
        </div>
      
    </div>
  )
}

export default Input  