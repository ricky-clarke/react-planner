'use client'
import { CommentCard, CommentCardMeta } from "./comment.styles";
import FormatDate from "@/app/_functions/formate_date";

const Comment = (props) => {

    const { count, content, published_date } = props;

    return (
        <>
           
            <CommentCard className="comment_card_container">
                <div className="comment_card">
                <CommentCardMeta>
                    <p>#{count + 1}&nbsp;&nbsp;&nbsp;name needed</p>
                    <div>
                        <p>{FormatDate(published_date)}</p>
                    </div>
                </CommentCardMeta>
                <div className="comment_copy" dangerouslySetInnerHTML={{ __html: content }}></div>
                </div>
            </CommentCard>
        </>
    )
}

export default Comment