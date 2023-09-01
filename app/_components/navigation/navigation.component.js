'use client'
import { useContext } from "react"
import globalContext from "@/app/_context/global-context"
import { NavigationContainer } from "./navigation.styles"

const Navigation = () => {

  const { state, dispatch } = useContext(globalContext);

  const addNewProfile = () => {

    if(state.newProfileModal === false) {
        dispatch({type:"NEWPROFILEOPEN", payload: true });
    }
}

const settings = () => {

    if(state.settingsModal === false) {
        dispatch({type:"SETTINGSOPEN", payload: true });
    }
}

    return (
        <>
            <NavigationContainer className="flex gap-6 justify-end">
            <a href="http://localhost:3000/to-do">To do</a>
            <a href="http://localhost:3000/dashboard">Dashboard</a>
            <button onClick={addNewProfile}>Create profile</button>
            <button onClick={settings}>Settings</button>
            </NavigationContainer>
        </>
    )

}

export default Navigation