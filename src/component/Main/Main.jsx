import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets/assets'
import {  useContext } from "react"
import {Context} from "../../context/Context" 
 
function Main() {

    // Here we destructing all the function and variable Here

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input}=useContext(Context)
  return (
<div className="main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon}></img>
        </div>
<div className="main-container">
    {/* agar false h toa greet wala nahi toa koi or auske niche wala */}
            {!showResult? 
                    <>
                    <div className="greet">
            <p><span>Hello Dev.</span></p>
            <p>How can i Help you today </p>
        </div>

        <div className="cards">
            {/*  first card*/}
            <div className="card">
                <p>Suggest  beautiful  places to see on upcoming road trip</p>
                <img src={assets.compass_icon}></img>
            </div>
    {/* second card */}
    <div className="card">
                <p>Briefly summarize this concept : urban planning</p>
                <img src={assets.bulb_icon}></img>
            </div>
            {/* third card  */}

            <div className="card">
                <p>Brainstorm team bonding Activity for your worktreat</p>
                <img src={assets.message_icon}></img>
            </div>

            {/* fourth card */}
            <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon}></img>
            </div>
           {/* cards div end here  */}
                    </div>

                     </>:<div className="result">
                        {/* result title Here result will be shown  */}

                        <div className="result-title">
                            <img src={assets.user_icon}></img>
                            <p>{recentPrompt}</p>
                        </div>

                        <div className="result-data">
                            <img src={assets.gemini_icon}></img>
                            {/* if we did not use dangerouslySetInnerHtml because  it will print everything included text or pargarahp */}
                            {/* <p>{resultData}</p> */}
                            {
                                // agar loading true h toa loader show kr nahi toa result show kr agar false h toa resultData
                                loading?<div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>:   <p dangerouslySetInnerHTML={{__html:resultData}}></p>
                            }
                        </div>
                     </div>
                        }
        

      
                    <div className="main-bottom">
                    {/* new div with a class name newbottom  */}

                    <div className="search-box">
                        <input onChange={(e)=>setInput(e.target.value)}  value={input} type="text" placeholder="Enter a prompt Here"></input>

                            <div>
                                {/* image div */}
                            <img src={assets.gallery_icon} alt="" />
                             <img src={assets.mic_icon}  alt="" />

                          {input?<img  onClick={()=>onSent()} src= {assets.send_icon} alt="" />:null}    
                            {/* image div end here */}
                            </div>  

                            {/* search-box-end */}
                      </div>
                            <p className='bottom-info'>
                            Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & Gemini Apps
                            </p>

              

                    {/* new div with a class name newbottom end here   */}
                    </div>






</div>
     </div>
  )
}

export default Main