import { AnimatePresence,motion } from "framer-motion";
import StartButton from "./StartButton";

function Winnertab({won, winner,onClick}) {
  
    return (
        <>
            {won ? 
            <AnimatePresence>
            <motion.div
            transition={{type:"spring",duration:1}}
            initial={{top:-150,opacity:0}}
            animate={{top:0,opacity:1}}
            className="bg-red-800/50 backdrop-blur-sm p-4 py-6 border-4 border-black w-fit rounded-xl absolute inset-0 m-[auto] flex flex-col justify-center items-center gap-8 h-fit">
                <p className="text-5xl font-bold"><span className="text-white">{winner}</span> Wins</p>
                <StartButton classNamex='!text-3xl !p-6' $backdrop animate={false} onClick={onClick}>PLAY AGAIN</StartButton>
            </motion.div>
            </AnimatePresence>
             : <></>}
        </>
    );
}

export default Winnertab;
