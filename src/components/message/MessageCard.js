import React, {useContext} from "react"
import { MessageContext } from "./ArticleProvider"
import { useHistory } from 'react-router-dom';

export const MessageCard = ({message}) => {
    // We need this so that we can can direct user to edit their articles
    const history = useHistory()
    // Bring these functions from context
    const { getMessages, deleteMessage} = useContext(MessageContext)

    return (
    <section className="messageBox">
        <div className="message">{message.user.name} : {message.message}</div>
    </section>
    )
}