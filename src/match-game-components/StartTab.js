import { useDispatch } from "react-redux";
import NormalButton from "./NormalButton";
import StartButton from "./StartButton";
import { AnimatePresence,motion } from "framer-motion";
import { Switch } from "@mui/material";

const difficultyx=[
    {text:"Hard",value:1},
    {text:"Normal",value:3},
    {text:"Easy",value:5},
]
const ratiosx=[
    {text:"4x3",value:[4,3]},
    {text:"4x4",value:[4,4]},
    {text:"5x4",value:[5,4]},
]

function StartTab({start,onStart,setRatio,setDifficulty,difficulty,ratio,setComputer,computer}) {
    const dispatch=useDispatch()

    return (
        <AnimatePresence>
            {!start &&
            <motion.div
            transition={{type:"spring",duration:1}}
            initial={{top:-150,opacity:0}}
            exit={{top:-150,opacity:0}}
            animate={{top:0,opacity:1}}
            className="bg-amber-500/50 backdrop-blur-sm p-3 py-6 border-4 border-black w-fit rounded-xl absolute inset-0 m-[auto] flex flex-col justify-center items-center gap-8 h-fit">
                 <div className="flex items-center gap-4">
                    <p className="text-white font-bold text-xl">Play vs computer:</p>
                    <Switch
                    color="default"
                     checked={computer}
                     onChange={()=>dispatch(setComputer())}
                     inputProps={{ 'aria-label': 'controlled' }}
                    />
                </div>
                {computer&&<div className="flex flex-col items-center gap-4">
                    <p className="text-white font-bold text-xl">Choose computer difficulty:</p>
                    <div className="flex gap-6">{difficultyx.map((o,i)=><NormalButton disabled={difficulty==o.value} onClick={()=>dispatch(setDifficulty(o.value))} key={i}>{o.text}</NormalButton>)}</div>
                </div>}
                <div className="flex flex-col items-center gap-4">
                    <p className="text-white font-bold text-xl">Choose grill ratio:</p>
                    <div className="flex gap-6">{ratiosx.map((o,i)=><NormalButton disabled={ratio[0]==o.value[0]&&ratio[1]==o.value[1]} onClick={()=>dispatch(setRatio(o.value))} key={i}>{o.text}</NormalButton>)}</div>
                </div>
                <StartButton $backdrop animate={false} classNamex=" !text-4xl !p-6 bg-white border-black" onClick={e=>{
                    onStart()
                    e.target.disabled=true;
                    }}>START GAME</StartButton>
            </motion.div>}
             </AnimatePresence>
    );
}

export default StartTab;