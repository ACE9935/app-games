import PlayButton from './PlayButton'
import { SelectBar } from './SelectBar'
import { useAppSelector,useAppDispatch } from "../app-state/app-hooks";
import { stop } from '../app-state/RPSSlice';
import GameButton from './GameButton';
import React from 'react';
import DisplayText from './DisplayText';

function GameWrapper() {

    const game=useAppSelector(selectGame=>selectGame.RPSReducer)
    const dispatch=useAppDispatch()

    return ( 
        <div className='flex flex-col items-center space-y-6'>
<SelectBar/>
 <PlayButton/>
<DisplayText text={game.score}>Score</DisplayText>
<DisplayText text={String(game.round)}>Round</DisplayText>
<GameButton onClick={()=>dispatch(stop())}>Stop</GameButton>
        </div>
     );
}

export default GameWrapper;