function WordDisplay({word}) {
    return ( <div className="word">
    {
        word.map((o,i)=><div className={`${o.char==" "?"spacer":""}`} key={i}>{o.found?o.char:""}</div>)
    } </div>);
}

export default WordDisplay;