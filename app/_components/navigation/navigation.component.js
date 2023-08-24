'use client'
import { useContext } from "react"
import globalContext from "@/app/_context/global-context"

const Navigation = () => {

  const { state, dispatch } = useContext(globalContext);

  const addNewProfile = () => {

    if(state.newProfileModal === false) {
        dispatch({type:"NEWPROFILEOPEN", payload: true });
    }
}

    return (
        <>
        <div className="flex gap-6 justify-end">
          <a href="http://localhost:3000/dashboard">Dashboard</a>
          <button onClick={addNewProfile}>Add profile</button>
          <a href="#">Profile</a>

        </div>
        </>
    )

}

export default Navigation