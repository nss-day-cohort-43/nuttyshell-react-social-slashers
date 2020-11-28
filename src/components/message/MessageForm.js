import React, { useContext, useRef, useEffect, useState } from "react"
import { MessageContext } from "../message/MessageProvider"
import { useHistory, useParams } from 'react-router-dom';
import { MessageCard } from "./MessageCard"
import './message.css'

export const MessageForm = (props) => {
    // Bring these functions from context
    const { messages, getMessages, addMessage, updateMessage} = useContext(MessageContext)
    // Set selected article into state
    const [message, setMessage] = useState({})
    // Used for retrieving an article ID from the url
    const {messageId} = useParams();
    // Used to we can direct where the page goes after adding / updating an article
    const history = useHistory();

    // Handle the form inputs
    const handleControlledInputChange = (event) => {
        //When changing a state object or array, 
        //always create a copy make changes, and then set state.
        const newMessage = { ...message }
        //article is an object with properties. 
        //set the property to the new value
        newMessage[event.target.name] = event.target.value
        //update state
        setMessage(newMessage)
        //event.target.value = ""
    }

    // Get article state on initialization
    useEffect(() => {
       getMessages()
       updateScroll()
    }, [])

    // This will be used for to create the objects that will be saved / updated
    const constructNewMessage = () => {
        // Our user ID is stored in local storage with the "slasherUser" variable
        const userId = parseInt(sessionStorage.getItem("slasherUser"))
        // This will test if an article ID is present. If not, it will be saved as a new article
        if (messageId === undefined) {
            if (message.message) {
                addMessage({
                    // userId is pulled from local storage
                    userId,
                    message: message.message,
                    dateSent: Date.now(),
                })
                // And then you will be directed to /articles
                .then(() => getMessages())
                .then(() => {
                    // Clear the message input after sending message
                    const clearer = document.querySelector("#messageMessage")
                    clearer.value = ""
                    message.message = ""
                })
            } else {
                window.alert("You must fill out the whole form!")
            }
        }    
        else {
            // If an article ID already exists, it knows to update the existing article
            if (messageId) {
                updateMessage({
                    // userId is pulled from local storage
                    userId,
                    message: message.message,
                    dateSent: message.dateSent,
                    id: message.id,
                })
                // And then you will be directed to /articles
                .then(() => history.push(`/`))
            }
        }
        
    }

    function updateScroll(){
        var element = document.querySelector(".messagesWindow");
        if(element){
            element.scrollTop = element.scrollHeight;
        }
        
    }

    return (
        <>
        <div className="allMessageBox">
        <h2>Deathly Discussion</h2>   
        <div className="messagesWindow">
            {
            messages.map(message => {
                return <MessageCard key={message.id} message={message}/>
			})
            }
            <div className="spacerDiv"></div>
        </div>
        <form className="messageForm">
            <fieldset>
                <div className="form-group">
              
                    <input type="textarea" id="messageMessage" name="message" required className="form-control" 
                    placeholder="Compose Message Here"
                    onChange={handleControlledInputChange}
                    defaultValue=""
                    
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault() // Prevent browser from submitting the form
                    constructNewMessage() // This will send the information off to be constructed into an object to be saved
                    updateScroll()
                }}
                className="btn btn-primary">
                Send
            </button>
        </form>
        </div>
        </>
    )
}