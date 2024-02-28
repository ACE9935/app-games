import { createSlice } from '@reduxjs/toolkit'

const initialStatex = {
   game:null
  };

export const appSlice = createSlice({
    name: 'app-games',
    initialState:initialStatex,
    reducers:{
        setGame:(state,action)=>{
            state.game=action.payload
        },
    }
})

export const { setGame} = appSlice.actions

export default appSlice.reducer