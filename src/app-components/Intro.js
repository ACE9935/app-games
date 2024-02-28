import { gamesArray } from '../gamesArray'
import {motion} from 'framer-motion'
import { useSelector,useDispatch } from 'react-redux';
import { setGame } from '../app-state/appSlice';
import { restartGame as restartHangman } from '../app-state/hangmanSlice';
import { restartGame as restartMatchGame } from '../app-state/matchSlice';
import { restartGame as restartRPSGame } from '../app-state/RPSSlice';
import { restartGame as restartTypeRacerGame } from '../app-state/typeracerSlice';

const variants1 = {
  initial:{scale:0},
  animate:{scale:1,transition:{
    duration:0.6
  }}
}

const variants2 = {
  initial:{y:400},
  animate:{y:0,
  transition:{
    duration:0.5
  }
  }
}

const variants3 = {
  initial:{opacity:0,},
  animate:{opacity:1,transition: {
    when: "beforeChildren",
    staggerChildren: 0.5,
  },}
}

function Intro({setPage}) {
  const {matchGame,hangmanGame,RPSReducer,typeRacerGame} = useSelector((state) => state)
  const dispatch = useDispatch()

  const gamesStates={
    "Hangman":hangmanGame,
    "Typeracer":typeRacerGame,
    "Match Game":matchGame,
    "Rock-Paper-Scissors":RPSReducer
  }
  const gamesResets={
    "Hangman":()=>dispatch(restartHangman()),
    "Typeracer":()=>dispatch(restartTypeRacerGame()),
    "Match Game":()=>dispatch(restartMatchGame()),
    "Rock-Paper-Scissors":()=>dispatch(restartRPSGame())
  }

  return (
      <main className='p-4 md:px-8 w-full grid place-items-center'>
    <section 
    style={{backgroundImage:"url('/wp.png')",
    backgroundSize:"340px 340px"
    }}
    className='w-full max-w-[1400px] pt-4 rounded-xl bg-red-400 relative overflow-hidden gap-4 flex flex-col md:flex-row justify-between px-4 font-["Bubblegum_Sans"]'>
      <motion.div
      transition={{duration:1,
        type:'spring'
      }}
      initial={{y:400}}
      animate={{y:0}}
      className='self-center bg-white border-4 border-black p-5 max-w-[650px]'>
        <p className='text-2xl text-slate-500 font-bold pb-2'>Welcome to our collection of mini-games</p>
        <h1 className='text-5xl font-bold'>We offer a set of mini-games of different kinds all in <span className='text-red-500'>ONE</span> place</h1>
      </motion.div>
      <motion.img
      transition={{duration:1,
      }}
      initial={{x:300}}
      animate={{x:0}}
      src="./hero.png" className='block h-fit self-end' width={400}/>
    </section>
    <section className='font-["Bubblegum_Sans"] flex items-center flex-col gap-8 py-8'>
      {gamesArray.map((o,i)=><motion.div
       initial="initial"
       whileInView={"animate"}
       viewport={{ once: true }}
      variants={variants3} style={{backgroundImage:i%2==0?'url("./banner.jpg")':'url("./banner2.jpg")'}} key={i} className='flex cursor-pointer overflow-hidden bg-contain flex-col md:flex-row md:even:flex-row-reverse gap-8 p-4 rounded-xl items-center w-full justify-between max-w-[1200px]'>
        <motion.img
        variants={variants1}
        className='w-[300px] aspect-[1] object-cover border-black border-4' src={o.image}/>
        <motion.div
        variants={variants2}
        className='h-fit p-4 border-4 border-black bg-white max-w-[750px]'>
          <h1 className='text-5xl text-red-400 pb-4 font-bold'>{o.name}</h1>
          <p className='text-3xl font-bold pb-2'>{o.description}</p>
          <div className='flex gap-3'>
          <button className='py-3 text-white rounded-lg hover:scale-[1.1] text-xl bg-red-400 px-5'
          onClick={()=>{
            setPage(i+1)
            dispatch(setGame(o.name))
            gamesResets[o.name]()
            }}
          >Play</button>
          {gamesStates[o.name].start&&<button className='py-3 text-white rounded-lg hover:scale-[1.1] text-xl bg-red-400 px-5'
          onClick={()=>{
            setPage(i+1)
            dispatch(setGame(o.name))
            }}
          >Resume game</button>}
          </div>
        </motion.div>
      </motion.div>)}
    </section>
    </main>
  );
}

export default Intro;
