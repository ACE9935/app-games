import { check } from '../app-state/hangmanSlice'
import { useSelector } from 'react-redux';

function isFieldDiscovered(array, fieldName, targetValue) {
  const foundObject = array.find(obj => obj[fieldName] !== targetValue);
  return !foundObject
}

function KeyBoard({check:dispatch,clickedKeys}) {
  const {typedWord} = useSelector((state) => state.hangmanGame)
    const str="abcdefghijklmnopqrstuvwxyz"
    const arr=Array.from(str);
    return ( 
        <div className="keyboard">
          {arr.map((o,i)=><button 
            onClick={e=>{
            return dispatch(check(o))
            }} className="k-button" disabled={clickedKeys.includes(o)} data-c={o} key={i}>{o}</button>)}
        </div>
     );
}

export default KeyBoard;