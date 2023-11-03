import React, { createContext, useState } from 'react';

// Crear un contexto
const SearchContext = createContext();

// Proveer el contexto en un componente superior
function SearchContextProvider({ children }) {
  const [justOnce, setJustOnce] = useState(false);
  const updateJustOnce = (newData) => {
    setJustOnce(newData);
    console.log(justOnce);
  };

  return (
    <SearchContext.Provider value={{ justOnce, updateJustOnce }}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContextProvider, SearchContext };