function StartButton({start,text}) {
    return ( 
        <button onClick={start}>
           {text}
        </button>
     );
}

export default StartButton