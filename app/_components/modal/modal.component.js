import { ModalContainer } from "./modal.styles"
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';


const Modal = ({ children }) => {

    const router = useRouter();

    return (
            <>
              <AnimatePresence mode="wait">
              <motion.div
                    key={router.route}
                    initial={{ opacity: 0, scale: 0.99}}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0}}
                    transition={{
                      // delay: 0.2,
                        type: "spring",
                       duration: 0.5,
                      }}
                      style={{
                        height: '100%',
                        inset:0,
                        position: 'fixed',
                        zIndex: '9',
                      //  background: 'rgba(0,0,0,0.3)',
                        width: '100%'
                      }}
                      >
                <ModalContainer>
                        {children}
                </ModalContainer>
                </motion.div>
          </AnimatePresence>
            </>
        )
}

export default Modal
