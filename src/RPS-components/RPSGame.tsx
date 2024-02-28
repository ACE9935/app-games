import React from 'react';
import { useAppSelector,useAppDispatch } from "../app-state/app-hooks";
import {initialize} from "../app-state/RPSSlice"
import GameButton from "./GameButton";
import GameWrapper from "./GameWrapper";
import ScoreTab from "./ScoreTab";
import SelectButton from "./SelectButton";
import Timer from "./Timer";
import { Actions,actions } from "./SelectBar";
import { restartGame } from '../app-state/RPSSlice';
import { useEffect } from 'react';

const RPSGame = () => {
 
  const game=useAppSelector(selectGame=>selectGame.RPSReducer)
  const dispatch=useAppDispatch()

  return (
    
    <section className="m-auto p-2 w-full items-center h-fit inset-0 flex flex-col space-y-5">
      <h1 className='text-5xl text-white font-bold pb-4 p-1'>Rock-Paper-Scissor Game</h1>
 <div className="flex space-x-7 justify-center items-center">
  {game.playing&&<h1 className="text-white text-3xl font-bold grid place-items-center">
     <Timer/>
  </h1>}
   <SelectButton style={{cursor:"unset"}}>{game.action1 && actions[game.action1 as keyof Actions]}</SelectButton>
  <SelectButton style={{cursor:"unset"}}>{game.action2 && actions[game.action2 as keyof Actions]}</SelectButton>
  </div>
 <section className='p-6 bg-slate-500 w-full max-w-[30rem] h-fit h-[25rem] rounded-xl grid place-items-center'>
 {game.round!=0 && (game.start?<GameWrapper/>:<ScoreTab/>)}
 {!game.start && game.round==0 && <GameButton onClick={()=>dispatch(initialize())}>Start a game</GameButton>}
 </section>
 </section>
  )
}

export default RPSGame