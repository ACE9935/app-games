import { createSlice } from '@reduxjs/toolkit'
import { words } from './hangmanWords';
import { produce } from 'immer';

const processWord=word => Array.from(word).map((o, i) => o==" "?({ char: o, found: true }):({ char: o, found: false }))

const initialStatex = {
    index: 0,
    start: false,
    won: false,
    word: null,
    tries: 10,
    typedWord: null,
    clickedKeys:[],
    category:null
  };

export const hangmanSlice = createSlice({
    name: 'hangman-game',
    initialState:initialStatex,
    reducers:{
        restartGame:(state)=>initialStatex,
        startGame:(state)=>{
            const wordx=words[Math.floor(Math.random() * words.length)]
            return {
                ...initialStatex,
                word:wordx.word,
                category:wordx.category,
                typedWord:processWord(wordx.word),
                start:true
             }
        },
        stopGame:(state)=>{
            return {
                ...state,
                typedWord:Array.from(state.word).map((o,i)=>({char:o, found:false})),
                won:true
             }
        },
        check: (state, action) => {
            if (state.won || state.tries === 0) return state;
            if (document.querySelector(`.k-button[data-c=${action.payload}]`).disabled) return state;
          
            const char = action.payload;
          
            // Use Immer's produce to create a draft
            return produce(state, (draftState) => {
              draftState.clickedKeys.push(char);
          
              if ([...draftState.word].includes(char)) {
                const arr = draftState.typedWord.map((o) => {
                  if (o.char === char) return { ...o, found: true };
                  else return { ...o };
                });
                draftState.typedWord = arr;
              } else {
                draftState.tries -= 1;
                draftState.index += 1;
              }
            });
          },
    }
})

export const { startGame,stopGame,check,restartGame} = hangmanSlice.actions

export default hangmanSlice.reducer