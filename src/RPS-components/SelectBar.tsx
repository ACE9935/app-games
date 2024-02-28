import { useEffect } from "react";
import { useAppSelector,useAppDispatch } from "../app-state/app-hooks";
import {select,reveal,stop} from "../app-state/RPSSlice"
import SelectButton from "./SelectButton";
import React from 'react';
import {SportsVolleyball,ContentCut,Receipt} from '@mui/icons-material';

export type Actions={
  pr:JSX.Element
  rk:JSX.Element
  sc:JSX.Element
 }

 export let actions:Actions={
   'pr':<Receipt className="!text-[50px]"/>,
   'rk':<SportsVolleyball className="!text-[50px]"/>,
   'sc':<ContentCut className="!text-[50px]"/>
 }

export function SelectBar() {
    const game=useAppSelector(selectGame=>selectGame.RPSReducer)
    const dispatch=useAppDispatch()
    let timer: NodeJS.Timeout | undefined;
    useEffect(() => {
        if(game.score1==5 || game.score2==5) dispatch(stop())
        if(game.playing){
        timer=setTimeout(
          () => dispatch(reveal()),
          4000
        );
        }
        return () => clearTimeout(timer);
      },[game.playing]);

    return ( 
        <div className="flex space-x-12 pb-8">
            {['sc','rk','pr'].map((o:keyof Actions | string)=>
            <SelectButton key={o} onClick={()=>{!game.action1 && game.playing && dispatch(select({...game,action1:o}))}}>{actions[o as keyof Actions]}
            </SelectButton>
            )}
            
        </div>
     );
}

