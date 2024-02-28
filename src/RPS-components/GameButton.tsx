import React from 'react';

function GameButton({...props}) {
    return ( <button {...props} className={`${props.className} bg-red-300 p-3 font-bold text-white shadow-xl rounded-xl hover:scale-[1.1]`}>{props.children}</button> );
}

export default GameButton;