import { createContext } from "react"
import run from '../config/gemini'
import {useState} from "react"






// create context 
 export const Context=createContext()


//  Provider

const ContextProvider=(props)=>{

// To display the data from the api we use state variable 

const [input , setInput]=useState("")

const [recentPrompt, setrecentPrompt]=useState("")
// use to store the previous prompt 
const [prevPrompt, setPrevPrompts]=useState([])
// when this will true then it will hide four div and show input result There
 
const [showResult , setshowResult]=useState(false)
// loading until data is not fetch
const [loading,setloading]=useState(false)
// show result in our webpage
const [resultData,setResultData]=useState("")



// this will used to generate a typing effect 

const delayPara=(index,nextword)=>{
    setTimeout(function(){
        setResultData(prev=>prev+nextword)
    },75*index)
}


// when we click on new chat then everything will be  reset and Home page will be show 
const newChat =()=>{
    setloading(false)
    setshowResult(false)

}




    const onSent = async(prompt)=>{
        //previous output will be clear form the input place 
        setResultData("")
        //Loading will be occur 
        setloading(true)
        //this will show result and hide all the div
        setshowResult(true)
        //Here we show the input field value in the gemini screen 
        setrecentPrompt(input)

 // In response we can store the response of api
        // If we get a parameter in prompt then generate a data using this prompt otherwise use input varibale ,state to generate a result on the basis of condition         
let response ; 
 
            if(prompt!==undefined)
            {
                response=await run(prompt)
                setrecentPrompt(prompt)
            }
            else {
                setPrevPrompts(prev=>[...prev,input])
                setrecentPrompt(input)
                response=await run(input)

            }
            //uncomment  start
        // setprevPromt is used to set the previous prompt  : it will store the previous prompt as well as current prompt
        // setPrevPrompts((prev)=>[...prev,input])
        // setPrevPrompts((prev)=>[...prev,input])

        // In response we can store the response of api
        // If we get a parameter in prompt then generate a data using this prompt otherwise use input varibale ,state to generate a result on the basis of condition
    //    const response= await run(input)
                // comment end Here




    //    Here we copy the response inside the responseArray and spilt it on the basis of **
       let responseArray=response.split("**")
       let newResponse="" ; 
       //IN this loop we can iteratre all the world that is seprated on the basis of **
       for(let i=0 ; i<responseArray.length; i++)
       {
        // jo  word seprater huwe h start se asuh word ko hum bold krenge 
        //if i ==0 or i is divide by 2 and remainder is not equal to one then even number 
        // jab b humera index zero hoga ya even hoga hum ak new array add karenge
        if(i===0|| i%2!==1)
        {
            newResponse+=responseArray[i]

        }

        else {
            newResponse+="<b>"+responseArray[i]+"</b>"
        }
       }
// IN newrespone we spilt on the basis of double star ** 
//IN newresponse2 we spilt on the basis of  single *

       let newResponse2=newResponse.split("*").join("<br> <br>")
       // In newResponse 
    //    modify 
    //    setResultData(newResponse2)

    // we can do this because we want to generate a typing effect 
       let newResponseArray=newResponse2.split(" ");
    //    for loop 


for (let i = 0 ; i<newResponseArray.length; i++)
{
    const nextword=newResponseArray[i];
    delayPara(i,nextword+"  ")
}

       setloading(false)
       setInput("")
    }
 


    // it is a type of database in which all the data are store and when we need it we can take or import from it 

    const contextValue={

        prevPrompt, 
        setPrevPrompts,
        onSent,
        setrecentPrompt,
        recentPrompt,
        showResult,
        setshowResult,
        loading,
        setloading,
        resultData, 
        setResultData,
        input, 
        setInput,
        newChat,


    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}


export default ContextProvider