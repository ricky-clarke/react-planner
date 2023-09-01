'use client'
import { useContext } from "react"
import { useRouter, usePathname } from 'next/navigation';
import Navigation from "../navigation/navigation.component"
import { ContainerGrid } from "./layout.styles"
import AddProfileForm from "../add-profile-form/add-profile-form.component"
import SettingsForm from "../settings-form/settings-form.component";
import globalContext from "@/app/_context/global-context"
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children }) => {

    const { state } = useContext(globalContext);
    const router = useRouter();
    const pathname = usePathname()


    return (
            <>
            <ContainerGrid>
                <div className="container m-auto">
                    <Navigation />
                    <AnimatePresence mode="wait">
                        <motion.div
                                key={pathname}
                                initial={{ opacity: 0}}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0}}
                                transition={{
                                    delay: 0.5,
                                // type: 'tween',
                                    duration: 1,
                                }}>
                                <main className="container container--main m-auto">
                                    <div>
                                        {children}
                                    </div>
                                </main>
                            </motion.div>
                            </AnimatePresence>
                        </div>
                </ContainerGrid>
             
            {state.newProfileModal === true && <AddProfileForm /> }

            {state.settingsModal === true && <SettingsForm /> }

            </>
        )
}

export default Layout
