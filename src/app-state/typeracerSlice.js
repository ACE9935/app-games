import { createSlice } from '@reduxjs/toolkit'

const initialStatex = {
   start:false,
   win:false,
   reset:false
  };

export const typeRacerSlice = createSlice({
    name: 'typeracer-game',
    initialState:initialStatex,
    reducers:{
        setStart:(state)=>{
            state.start=true
        },
        setWin:(state,action)=>{
            state.win=action.payload
        },
        setReset:(state,action)=>{
            state.reset=action.payload
        },
        restartGame:(state)=>{
            return initialStatex
        },
    }
})

export const { setStart,setWin,setReset,restartGame} = typeRacerSlice.actions

export default typeRacerSlice.reducer