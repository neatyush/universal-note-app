import { use, useState } from "react";

function Form() {
  const[count,setCount]= useState(0)
  return(
    <>
    <p>The Count is{count}</p>
    <button onClick={(e)=>{
      e.preventDefault
      setCount((prevCount)=> prevCount+1)
      setCount((prevCount)=> prevCount+1)
      setCount((prevCount)=>prevCount+1)

    }}>Click me</button>
    <Form></Form>
    </>


  )
}

export default Form