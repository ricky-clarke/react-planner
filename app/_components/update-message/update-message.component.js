import { UpdatedMessageContainer } from "./update-message.styles"

const UpdateMessage = ( { copy } ) => {

    return (
        <>
            <UpdatedMessageContainer>
                <div><p>{copy}</p></div>
           </UpdatedMessageContainer>
        </>
    )
}

export default UpdateMessage