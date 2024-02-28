import React from 'react';

function SelectButton({...props}) {
    return ( 
        <div className="cursor-pointer h-fit w-fit h-fit rounded-full bg-amber-400 p-3 hover:bg-amber-500" {...props}>{props.children}
        </div>
     );
}

export default SelectButton;