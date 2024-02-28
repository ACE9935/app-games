import { useEffect, useState } from "react"
import React from 'react';


function Timer() {
const [an,setA]=useState(0)

    useEffect(()=>{
        
        const time=setInterval(()=>{
            setA(prev=>prev+1)
            if(an==4) {alert(10);clearInterval(time)}
            },1000)
            return ()=> {
                clearInterval(time);
              };
    },[])
        
    return ( 
        <div>{an}</div>
     );
}

export default Timer;