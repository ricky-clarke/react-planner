import { useContext } from "react"
import Navigation from "../navigation/navigation.component"
import { ContainerGrid } from "./layout.styles"
import AddProfileForm from "../add-profile-form/add-profile-form.component"
import globalContext from "@/app/_context/global-context"

const Layout = ({ children }) => {

    const { state } = useContext(globalContext);

    return (
            <>
            <ContainerGrid>
                <div className="container m-auto">
                    <Navigation />
                    <main>
                        <div>
                            {children}
                        </div>
                    </main>
                </div>
            </ContainerGrid>

            {state.newProfileModal === true && <AddProfileForm /> }

            </>
        )
}

export default Layout
