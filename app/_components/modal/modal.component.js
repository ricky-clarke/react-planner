import { ModalContainer } from "./modal.styles"

const Modal = ({ children }) => {

    return (
            <>
            <ModalContainer>
                <div className="modal_container">
                    {children}
                </div>
            </ModalContainer>
            </>
        )
}

export default Modal
