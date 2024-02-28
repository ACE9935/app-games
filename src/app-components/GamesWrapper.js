
import HangmanGame from '../hangman-game-components/HangmanGame';
import RPSGame from '../RPS-components/RPSGame';
import MatchGame from '../match-game-components/MatchGame';
import TypeRacerGame from '../type-racer-components/TypeRacerGame';
import Intro from './Intro';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDispatch } from 'react-redux';
import { setGame } from '../app-state/appSlice';
import { useSelector } from 'react-redux';

function GamesWrapper() {
  const [page,setPage]=useState(0)
  const {waitForComputer} = useSelector((state) => state.matchGame)
  const dispatch=useDispatch()
  const pages=[<Intro setPage={setPage}/>,<HangmanGame/>,<TypeRacerGame/>,<MatchGame/>,<RPSGame/>]
  return (
    <div>
    <link href="https://fonts.googleapis.com/css2?family=Bubblegum+Sans&display=swap" rel="stylesheet"></link>
    <div className='grid place-items-center min-h-screen'>
      {page>0&&<div className='absolute top-0 left-0 m-2 flex flex-col gap-3'><ArrowBackIcon
      style={{fontSize:60,
        opacity:!waitForComputer?1:0.4
      }}
      onClick={()=>{
        if(!waitForComputer){
        dispatch(setGame(null))
        setPage(0)}}} className='cursor-pointer hover:scale-[1.1] text-white z-[4] w-fit'/>
      </div>
      }
    {pages[page]}
    </div>
    </div>
  );
}

export default GamesWrapper;