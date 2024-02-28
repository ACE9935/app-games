import React, { useEffect } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import "./hangman.scss"
import DisplayView from "./DisplayView";
import KeyBoard from "./KeyBoard";
import StartButton from './StartButton';
import { check,startGame,stopGame,restartGame } from '../app-state/hangmanSlice';
import { useDispatch,useSelector } from 'react-redux';
import WordDisplay from './WordDisplay';

function HangmanGame({ children }) {
  const {word,index,start,won,tries,typedWord,category,clickedKeys} = useSelector((state) => state.hangmanGame)
  const dispatch = useDispatch()

    useEffect(()=>{

      const handleKeyPress = (event) => {
        const pressedKey = event.key;
  
        if(start&&!won)dispatch(check(pressedKey));
      };
  
      window.addEventListener('keydown', handleKeyPress);
  
      const x=typedWord?typedWord.every(o=>o.found==true):null
      if(x) dispatch(stopGame())

      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };

    })
    
    return (
      <section className="hmg">
                <AnimatePresence mode='wait'>
          {won ? (
             <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 20 }}
             transition={{ duration: 0.5 }}
             key="won"
             className="g-container">
            <motion.div
              className="App flex flex-col gap-8"
            >
                <div style={{ textAlign: "center" }}>
              <p className='text-3xl text-green-800 pb-5'>You Won!</p>
                <p className='text-xl'>The Word Was: <span className='text-blue-700'>{word}</span></p>
              </div>
              <StartButton text={"Restart"} start={() => dispatch(startGame())} />
            </motion.div>
            </motion.div>
          ) : tries === 0 ? (
            <motion.div
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 20 }}
             transition={{ duration: 0.5 }}
             key="lose"
             className="g-container">
            <motion.div
              className="App flex flex-col gap-8"
            >
              <div style={{ textAlign: "center" }}>
              <p className='text-3xl text-red-600 pb-5'>You Lost!</p>
                <p className='text-xl'>The Word Was: <span className='text-blue-700'>{word}</span></p>
              </div>
              <StartButton text={"Restart"} start={() => dispatch(startGame())} />
            </motion.div>
            </motion.div>
          ) :start ? (
            <motion.section
            key="gamex"
            className='overflow-hidden'
            >
            <motion.div
             className='g-container !bg-amber-500'
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 20 }}
             transition={{ duration: 0.5 }}
             >
            <div
              className="g-container relative"
            >
              <div className='text-xl'>{category}</div>
              <DisplayView tries={tries}/>
              <WordDisplay word={typedWord} />
              <KeyBoard clickedKeys={clickedKeys} check={dispatch} />
            </div>
            </motion.div>
            </motion.section>
          ) : (
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            key="games"
            className="g-container">
            <motion.div
            className='flex flex-col items-center justify-center gap-10 py-4'
            >
              <h1 className='!text-black'>HANGMAN GAME</h1>
            <StartButton text={"Start Game!"} start={() => dispatch(startGame())} />
            </motion.div>
            </motion.div>
          )}
            </AnimatePresence>
            </section>
    );
  }
  
  export default HangmanGame;
  