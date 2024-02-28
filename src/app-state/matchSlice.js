import { createSlice } from '@reduxjs/toolkit'
import { produce } from 'immer';

function generateSquareInit(postion,index,status){
  return {
    position:postion,
    index:index,
    discovered:false,
    opened:status,
  }
}

function getRandomItemsFromArray(array, count) {
  const shuffledArray = [...array].sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, count);
}

function handleTurns(state,payload){
  if(!state.start) return state
  return produce(state, (draftState) => {
    const index = payload;
    draftState.processing=false
    draftState.squares[index] = produce(draftState.squares[index], (draftSquarex) => {
      draftSquarex.opened = true;
    });
    if(state.pending){
      if(draftState.squares[index].index==state.currentIndex){
        if(state.waitForComputer) draftState.continuePlayComputer+=1
        draftState.squares[index] = produce(draftState.squares[index], (draftSquarex) => {
          draftSquarex.discovered = true;
        });
        draftState.squares[state.previousPosition] = produce(draftState.squares[state.previousPosition], (draftSquarex) => {
          draftSquarex.discovered = true;
        });
        draftState.rememberedSquares=draftState.rememberedSquares.map((o,i)=>{
          if(o.position==index||o.position==state.previousPosition) return {...o,discovered:true}
          return {...o}
        })
        draftState.pending=false
        draftState.previousPosition=null
        draftState.index=null
        if(countObjectsWithDiscoveredFalse(draftState.squares)===2){
          draftState.winner=state.waitForComputer?"Computer":"Player-1"
          draftState.waitForComputer=false
          draftState.continuePlayComputer=0
           draftState.squares=draftState.squares.map(obj => ({ ...obj,opened:true, discovered: true }));
        }
      }else{
        draftState.squares[index] = produce(draftState.squares[index], (draftSquarex) => {
          draftSquarex.opened = false;
        });
        draftState.squares[state.previousPosition] = produce(draftState.squares[state.previousPosition], (draftSquarex) => {
          draftSquarex.opened = false;
        });
        draftState.pending=false
        draftState.previousPosition=null
        draftState.currentIndex=null
      if(state.computer){
        if(state.waitForComputer){
          draftState.continuePlayComputer=0
          draftState.waitForComputer=false
        }
        if(!state.waitForComputer)draftState.waitForComputer=true
      }}
    }else{
    draftState.pending=true
    draftState.previousPosition=index
    draftState.currentIndex=draftState.squares[index].index
    }
  });
}

function countObjectsWithDiscoveredFalse(array) {
  return array.reduce((count, obj) => (obj.opened === false ? count + 1 : count), 0);
}

function generateTwoDifferentRandomNumbers(ratioX,ratioY) {
  let num1 = Math.floor(Math.random() * ratioX*ratioY);
  let num2;

  do {
    num2 = Math.floor(Math.random() * ratioX*ratioY);
  } while (num2 === num1);

  return [num1, num2];
}

function generateSquares(squares,ratioX,ratioY,imgLength,status) {
  for(let i=0;i<(ratioX*ratioY)/2;i++){
    let indexes;
    do{
      indexes=generateTwoDifferentRandomNumbers(ratioX,ratioY)
    }while(squares[indexes[0]]!==undefined || squares[indexes[1]]!==undefined)

    const j=Math.floor(Math.random() * imgLength);
    squares[indexes[0]]=generateSquareInit(indexes[0],j,status)
    squares[indexes[1]]=generateSquareInit(indexes[1],j,status)
  }

  return squares
}

function pushIfFieldDiff(array, newObj) {
  if (array.every(obj => obj.position !== newObj.position)) {
    array.push(newObj);
  }
  return array
}

const initialState = {
  squares:[],
  rememberedSquares:[],
  images:["/match1.png","/match2.png","/match3.png","/match4.png","/match5.png"],
  won:false,
  availableSquares:[],
  waitForComputer:false,
  computer:false,
  start:false,
  pending:false,
  currentIndex:null,
  previousPosition:null,
  processing:false,
  waiting:false,
  continuePlayComputer:0,
  stop:false,
  winner:null,
  difficulty:3,
  ratioX:4,
  ratioY:4,
}

export const matchSlice = createSlice({
  name: 'match-game',
  initialState,
  reducers: {
    startGame: (state) => {
      state.processing=true
      state.waiting=true
      state.squares=generateSquares(state.squares,state.ratioX,state.ratioY,state.images.length,true)
      if(state.computer) state.rememberedSquares=getRandomItemsFromArray(state.squares,0)
    },
    setRatio: (state,action) => {

      state.ratioX=action.payload[0]
      state.ratioY=action.payload[1]
    },
    setDifficulty: (state,action) => {
      state.difficulty=action.payload
    },
    playAgainstComputer: (state) => {
      state.computer=!state.computer
    },
    startPlay: (state) => {
      state.start =true
      state.processing=false
      state.waiting=false
     state.squares=state.squares.map((o,i)=>({...o,opened:false}))
    },
    initiateProcess:(state, action) => {
      const luck = 1===(Math.floor(Math.random() * state.difficulty)+1)
      return produce(state, (draftState) => {
        const index = action.payload;
        draftState.processing=true
        if(luck==true)draftState.rememberedSquares=pushIfFieldDiff(draftState.rememberedSquares,draftState.squares[index])
        draftState.squares[index] = produce(draftState.squares[index], (draftSquarex) => {
          draftSquarex.opened = true;
        });
      })
    },
    checkIfWon:(state) => {
      if(state.stop||!state.start) return state
      const check= state.squares.every(obj => obj.discovered===true);
      if(check){
        state.won=true
        state.stop=true
      }
      else return state
    },
    restartGame:(state) => {
       return initialState
    },
    stopGame:(state) => {
      state.stop=true
      state.won=false
      state.continuePlayComputer=0
      state.waitForComputer=false
      state.squares=state.squares.map(o=>({...o,opened:true,discovered:true}))
    },
    computerRound:state=>{
     state.waitForComputer=true
    },
    playerRound:state=>{
      state.waitForComputer=false
     },
    clickProcess: (state, action) => {
      if(state.stop) return state
      return handleTurns(state,action.payload)
    },

  },
})

// Action creators are generated for each case reducer function
export const { startGame, clickProcess, initiateProcess, checkIfWon, restartGame,startPlay,stopGame,setDifficulty,setRatio,playAgainstComputer } = matchSlice.actions

export default matchSlice.reducer