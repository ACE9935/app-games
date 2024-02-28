import { useAppSelector,useAppDispatch } from "../app-state/app-hooks";
import {reset} from "../app-state/RPSSlice"
import React from 'react';
import GameButton from "./GameButton";
import DisplayText from "./DisplayText";

function ScoreTab() {

    const game=useAppSelector(selectGame=>selectGame.RPSReducer)
    const dispatch=useAppDispatch()

    return ( 
        <div className="font-bold text-lg flex flex-col space-y-3">
        <DisplayText text={game.winner}>Winner</DisplayText>
        <DisplayText text={String(game.score)}>Game score</DisplayText>
        <DisplayText text={String(game.round)}>Rounds played</DisplayText>
        <GameButton className='relative top-[20px]' onClick={()=>dispatch(reset())}>Restart game</GameButton>
        </div>
     );
}

export default ScoreTab;