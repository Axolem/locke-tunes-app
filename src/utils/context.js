import { useState, createContext,} from "react";

export const AppStateContext = createContext();

export const AppStateProvider = (props) => {
  const [user, setUser] = useState(false)

  return (
    <AppStateContext.Provider value={{user, setUser}}>
      {props.children}
    </AppStateContext.Provider>
  );
};
