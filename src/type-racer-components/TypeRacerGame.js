
import { useQuery } from "react-query";
import Timer from "./Timer";
import PlayBar from "./PlayBar";
import { setReset, setStart, setWin } from "../app-state/typeracerSlice";
import { useDispatch,useSelector } from 'react-redux';


const fetchQuote = async () => {
   let res = await fetch("https://api.quotable.io/random");
   res=await res.json();

   return res.content
 };

function TypeRacerGame() {
  const {start,win,reset} = useSelector((state) => state.typeRacerGame)
  const dispatch = useDispatch()
   const { status, data:sx, error,refetch } = useQuery('quotes', fetchQuote, {
      staleTime: Infinity,
      cacheTime:Infinity
    })

    const handleClick1 = async event => {
      await refetch();
      dispatch(setStart())
    };

    const handleClick2 = async event => {
      await refetch();
      dispatch(setWin(false))
      dispatch(setReset(true))
    };

    return ( 
        <div className="bg-blue-500 w-[calc(100vw-20px)] max-w-[600px] aspect-[1.5/1] rounded-xl flex flex-col relative items-center">
        <h1 className='font-bold text-3xl text-white text-center p-3 pb-16 bg-blue-700 rounded-t-xl w-full h-fit'>Type Racer</h1>
        <div className='bg-white w-[80%] aspect-[1.5/1] mb-8 translate-y-[-10%] rounded-xl relative flex flex-col'>
         <div className="grid place-items-center grow">
      <Timer isPaused={win || !start} reset={reset} setReset={dispatch}/>
         </div>
           <div className='bg-blue-300 rounded-xl border-dashed border-2 border-black flex flex-col items-center gap-6 pt-8 pb-12 px-5'>
          {start && !win && <PlayBar {...{win,sx}} setWin={dispatch}/>}
            {!start && <button onClick={handleClick1} className="text-xl bg-green-600 p-5 text-white font-bold hover:bg-green-700">Start Race!</button>}
            {win && <button onClick={handleClick2} className="text-xl bg-green-600 p-5 text-white font-bold hover:bg-green-700">Play Again!</button>}
           </div>
        </div>
       </div>
     );
}

export default TypeRacerGame;