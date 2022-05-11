import React, {useState, useEffect, useContext, createContext} from 'react'
import {getCart, saveCart} from '../utils/cart'


export const ModeContext = createContext(null)

export default ({children}) =>{
	
    const mode = JSON.parse(localStorage.getItem('lightMode'))

  return (
    	<ModeContext.Provider value={{mode}}>
			{children}
		</ModeContext.Provider>
  );
}