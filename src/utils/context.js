import { useState, createContext, } from "react";

export const AppStateContext = createContext();

export const AppStateProvider = (props) => {
  const [user, setUser] = useState(false)
  const [login, setLogin] = useState(false)

  const retryLogin = () => {
    setLogin(!login)
  }

  return (
    <AppStateContext.Provider value={{ user, setUser, login, retryLogin }}>
      {props.children}
    </AppStateContext.Provider>
  );
};
