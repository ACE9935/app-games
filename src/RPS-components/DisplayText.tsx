import React from "react";


function DisplayText({text,children}:{text:string | null,children:React.ReactNode}) {
    return ( 
        <div className='font-bold text-lg'>{children}: <span className="text-amber-300">{text}</span></div>
     );
}

export default DisplayText;