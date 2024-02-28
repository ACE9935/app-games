import { configureStore } from '@reduxjs/toolkit'
import matchReducer from './matchSlice'
import hangmanReducer from './hangmanSlice'
import RPSReducer from './RPSSlice'
import typeracerSlice from './typeracerSlice'
import appSlice from './appSlice'

export const store = configureStore({
  reducer: {
    app:appSlice,
    matchGame:matchReducer,
    hangmanGame:hangmanReducer,
    RPSReducer:RPSReducer,
    typeRacerGame:typeracerSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch