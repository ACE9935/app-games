import { createSlice, PayloadAction,createAsyncThunk } from '@reduxjs/toolkit'
import { store } from './store'
import type {RootState} from './store'
import gameProcess from './RPScomputer'

// Define a type for the slice state
export interface GameState {
  round:number
  playing: boolean
  start:boolean
  score1:number
  score2:number
  winner:string | null
  score:string | '0-0'
  action1: 'sc' | 'rk' | 'pr' | null |string
  action2: 'sc' | 'rk' | 'pr' | null | string
}

// Define the initial state using that type
const initialState: GameState = {
  round:0,
  winner:null,
  start:false,
  playing: false,
  score1:0,
  score2:0,
  score:'0-0',
  action1:null,
  action2:null
}

const actions=["sc","rk","pr"]
export const RPSSlice = createSlice({
  name: 'RPS',
  initialState,
  reducers: {
    initialize:(state):GameState=>({...state,round:1,playing:true,start:true}),
    start: (state):GameState=>({...state,round:state.round+1,action1:null,action2:null,playing:true}),
    select: (state,action):GameState=>({...action.payload,playing:true}),
    reveal: (state):GameState=>{
      const actionx=actions[Math.floor(Math.random() * 3) + 0]
      const actiony=state.action1?state.action1:actions[Math.floor(Math.random() * 3) + 0]
      const result=gameProcess(actionx,actiony)
      const score1=actiony==result?state.score1+1:state.score1
      const score2=actionx==result?state.score2+1:state.score2
      const score=String(score1)+'-'+String(score2)
      
      return ({...state,score:score,score1:score1,score2:score2,action2:actionx,action1:actiony,playing:false})
    },
    stop:(state)=>({...state,playing:false,action1:null,action2:null,winner:state.score1==state.score2?'Draw':Math.max(state.score1,state.score2)==state.score1?'Player-1':'Player-2',start:false}),
    reset:state=>({...initialState,round:1,start:true,playing:true}),
    restartGame:(state)=>initialState,
  }})

export const { select,stop,reveal,start,reset,initialize,restartGame } = RPSSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectGame = (state: RootState) => state.RPSReducer

export default RPSSlice.reducer