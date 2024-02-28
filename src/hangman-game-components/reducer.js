import { initState } from "./GameContainer"

function reducer(state,action) {
        switch (action.type) {
            case "start":
           
             return {
                ...initState,
                start:true
             }
            case "stop":
              return {
                ...state,
                typedWord:()=>Array.from(state.word).map((o,i)=>({char:o, found:false})),
                won:true
             }
             case "check":
             const char=action.char
             
            if ([...state.word].includes(char)){
                const arr=state.typedWord().map(o=>{
                    if(o.char==char) return ({...o, found:true})
                    else return ({...o})
                })
            return ({...state,typedWord:()=>arr})
            }else{
                document.querySelector(".hangman").childNodes[state.index].classList.add("path")
                return ({...state,tries:state.tries-1,index:state.index+1})
            } 

            default:
              return state
        }
}

export default reducer;