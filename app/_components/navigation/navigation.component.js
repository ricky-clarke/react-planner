'use client'
import { useContext, useState, useEffect } from "react"
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


const [accentColor, accentColorHandler] = useState({
    accent_color: ''
  })

  useEffect(() => {

    const brandingJSON = localStorage.getItem('planner');
    const branding = JSON.parse(brandingJSON);

    accentColorHandler({
      accent_color : branding?.accent_color,
    })

  }, [])

  const branding = {
    card_container : {
      borderColor: accentColor?.accent_color, 
    },
  };

    return (
        <>
            <NavigationContainer className="flex gap-6 justify-end card_container" style={branding.card_container}>
            <a href="http://localhost:3000/to-do">To do</a>
            <a href="http://localhost:3000/dashboard">Dashboard</a>
            <button onClick={addNewProfile}>Create profile</button>
            <button onClick={settings}>Settings</button>
            </NavigationContainer>
        </>
    )

}

export default Navigation