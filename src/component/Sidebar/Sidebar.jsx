import React from 'react'
import   './Sidebar.css'
 import {assets} from "../../assets/assets/assets"
 import {useState} from "react"
 import { useContext } from 'react'
 import {Context} from "../../context/Context"
 const Sidebar=()=>{
        
    const [extended,setExtended]=useState(false)

// Here we get some state form useContext 
const {onSent,prevPrompt,setrecentPrompt,newChat}=useContext(Context)

 console.log(prevPrompt)
    console.log(assets)
    // function of side bar when we click on recent content then it will again search for data

    // in Prompt we receive an array
    const loadPromt=async(prompt)=>{
        setrecentPrompt(prompt)
        await onSent(prompt)
    }




  return (
    <div className='sidebar'> 
            {/* first div */}
            <div className='top'>  
                <img className="menu" onClick={()=>setExtended(prev=>!prev)} src={assets.menu_icon} w-20px/>

    <div className="new-chat " onClick={()=>newChat()}>
        <img src={assets.plus_icon}></img>
     {extended?<p>New Chat</p>:null} 

    </div>
{/* top will close Here */}

        {extended?<div className="recent">
        <p className="recent-title">Recent</p>
        {prevPrompt .map((item,index)=>{
                return (
                    // Here we link loadprompt funciton 
                    <div  onClick={()=>loadPromt(item)}className="recent-entry">
                    <img src={assets.message_icon}></img>
                    {/* <p> 
                        {item.slice(0,20)}...
                        </p> */}
        <p>{item.length<=3?<p>{item}</p>:<p>{item.slice(0,20)}...   </p>}</p>



                    </div>
                )
        })}
       
        {/* recent tag close here  */}
        </div>:null
}
     
            </div>
 
            <div className='bottom'>
                {/* first div */}
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon}/>
         {extended?<p>Help</p>:null}   
        </div>
{/* second div */}
<div className="bottom-item recent-entry">
            <img src={assets.history_icon}/>
         {extended?<p>Activity</p>:null}   
        </div>
        {/* third div */}
        <div className="bottom-item recent-entry">
            <img src={assets.setting_icon}/>
         {extended?<p>Setting</p>:null}   

        </div>

        




            {/* bottom tag end Here */}
            </div>
    
    
    
    </div>
  )
}

export default Sidebar; 