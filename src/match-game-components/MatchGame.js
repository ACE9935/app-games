import { useSelector, useDispatch } from 'react-redux'
import { startGame,clickProcess,initiateProcess, checkIfWon,restartGame, startPlay, stopGame, setDifficulty, setRatio, playAgainstComputer } from '../app-state/matchSlice'
import styled, { css } from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useEffect } from 'react';
import { availableSquares } from '../app-state/Matchcomputer';
import Winnertab from './WinnerTab';
import StartTab from './StartTab';

const StyledContainer = styled(motion.div)`
position:relative;
.back{
    position:absolute;
    width:100%;
    height:100%;
    background:gray;
    backface-visibility: hidden;  
    transition:transform 1.2s;
  }
  .img-face{
    width:100%;
    height:100%;
    position:absolute;
    transition:transform 1.2s;
  }
  ${props =>
    props.$openedx &&
    css`
    .img-face,.back{
        transition:transform 1.2s;
        transform:rotateY(180deg); 
      }
    `};
    ${props =>
        props.$discovered &&
        css`
         opacity:0.7 !important;  
        `};
`
const parentVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1, // Adjust the stagger duration as needed
      },
    },
  };
  
  const childVariants = {
    initial: { scale: 0 },
    animate: { scale:1 },
  };

function MatchGame() {
    const {ratioX,winner,difficulty,ratioY,pending,rememberedSquares,squares,continuePlayComputer,start,images,processing,won,stop,waiting,waitForComputer,computer} = useSelector((state) => state.matchGame)
    const dispatch = useDispatch()

    function playTurnForComputer(squaresx){
        const [positionX,positionY]=availableSquares(squaresx,rememberedSquares)

        setTimeout(()=>{
            dispatch(initiateProcess(positionX))
            setTimeout(()=>{
                dispatch(clickProcess(positionX))
            },1200)
            setTimeout(()=>{
                dispatch(initiateProcess(positionY))
            setTimeout(()=>{
                dispatch(clickProcess(positionY))
                dispatch(checkIfWon())
            },1200)
            },1200)
        },1300)
      }

    useEffect(()=>{

        if(waiting)  gsap.fromTo(
            ".box",
            { opacity: 0,},
            { opacity: 1,ease: 'power3.out',duration:1.3 }
          );
    },[waiting])
    

    useEffect(()=>{
        if(computer) if(waitForComputer) playTurnForComputer(squares)
    },[continuePlayComputer,waitForComputer])

    return ( 
        <div className='p-4 bg-amber-500 flex flex-col gap-4 relative'>
        <motion.div
        variants={parentVariants} initial="initial" animate="animate"
        style={{gridTemplateColumns:`repeat(${ratioX}, 100px)`,
        gridTemplateRows:`repeat(${ratioY}, 100px)`
    }}
        className={`grid gap-3 bg-white p-3 shadow-lg`}>
         {
         start?
         squares.map((o,i)=>
         <AnimatePresence key={i}>
         <StyledContainer
          transition={{duration:1}}
          initial={{opacity:0}}
          animate={{opacity:1}}
          className='cursor-pointer box'
          key={i}
          onClick={()=>{
          if(!stop&&!waitForComputer&&processing==false&&o.opened==false){
            dispatch(initiateProcess(o.position))
            setTimeout(()=>{
            dispatch(clickProcess(o.position))
            dispatch(checkIfWon())
        },1200)
        } }}
           $openedx={o.opened?1:0}
           $discovered={o.discovered?1:0}
           >
         <div className='img-face bg-contain cursor-pointer bg-center bg-no-repeat' style={{backgroundImage:`url(${images[o.index]})`}}>
         </div>
         <div className='back'></div>
         </StyledContainer>
         </AnimatePresence>
         ):
         [...Array(ratioX*ratioY).keys()].map((_, index)=><motion.div variants={childVariants} key={index} className='bg-red-500'></motion.div>
         )}
        </motion.div>
        {(!won&&stop)&&<button className='p-3 hover:scale-[1.1] transition text-lg text-white rounded-full w-fit font-bold bg-black' onClick={()=>{
            dispatch(restartGame())
        }}>Play again</button>}
        <StartTab onStart={()=>{
            dispatch(startGame())
            dispatch(startPlay())
        }}
        start={start}
        computer={computer}
        difficulty={difficulty}
        ratio={[ratioX,ratioY]}
        setDifficulty={setDifficulty}
        setComputer={playAgainstComputer}
        setRatio={setRatio}
        />
        <Winnertab won={won} winner={winner} onClick={()=>dispatch(restartGame())}/>
            {(!stop && start)&&<button className='p-3 hover:scale-[1.1] transition text-lg text-white rounded-full w-fit font-bold bg-black' onClick={()=>dispatch(stopGame())}>Stop Game</button>}
        </div>
     );
}

export default MatchGame;