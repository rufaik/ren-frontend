import React, { createContext} from 'react'


export const ModeContext = createContext(null)

export default ({children}) =>{
	
    const mode = JSON.parse(localStorage.getItem('lightMode'))

  return (
    	<ModeContext.Provider value={{mode}}>
			{children}
		</ModeContext.Provider>
  );
}