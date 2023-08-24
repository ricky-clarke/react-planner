'use client';
import { useReducer, createContext } from "react";
import { GlobalReducer , INITIAL_STATE} from "../_reducer/global-reducers";


// Create the context/provider
export const globalContext = createContext();

export default globalContext;

export const GlobalStateProvider = ({ children }) => {

    // Create the reducer
    const [state, dispatch] = useReducer(GlobalReducer, INITIAL_STATE);
    //   const [current state, dispatch function] = useReducer(reducer name, initial state);

    const values = {
        state,
        dispatch
      };

    // Wrap the context provider around our component
    return <globalContext.Provider value={values}>{children}</globalContext.Provider>;
};