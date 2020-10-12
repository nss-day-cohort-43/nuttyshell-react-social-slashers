import React, { useContext, useState, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { useHistory, useParams } from 'react-router-dom';

export const EventForm = (props) => {
    const { addEvent, getEventById, updateEvent } = useContext(EventContext)
    const userId = localStorage.getItem("slasherUser")


    //for edit, hold on to state of animal in this view
    const [event, setEvent] = useState({})
    //wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    const {eventId} = useParams();
    const history = useHistory();

    //when field changes, update state. This causes a re-render and updates the view.
    //Controlled component
    const handleControlledInputChange = (event) => {
        //When changing a state object or array, 
        //always create a copy make changes, and then set state.
        const newEvent = { ...event }
        //animal is an object with properties. 
        //set the property to the new value
        newEvent[event.target.name] = event.target.value
        //update state
        setEvent(newEvent)
    }
    
    // Get customers and locations. If animalId is in the URL, getAnimalById
    useEffect(() => {
        if (eventId){
            getEventById(eventId)
            .then(event => {
                setEvent(event)
                setIsLoading(false)
            })
            } else {
                setIsLoading(false)
            }
    }, [])

    const constructEventObject = () => {
            //disable the button - no extra clicks
            setIsLoading(true);
            if (eventId){
                //PUT - update
                updateEvent({
                    id: event.id,
                    name: event.name,
                    userId: userId,
                    eventCity: event.eventCity,
                    eventState: event.eventState,
                    eventZip: event.eventZip,
                    startDate: event.startDate,
                    endDate: event.endDate
                })
                .then(() => history.push(`/events/detail/${event.id}`))
            }else {
                //POST - add
                addEvent({
                    name: event.name,
                    userId: userId,
                    eventCity: event.eventCity,
                    eventState: event.eventState,
                    eventZip: event.eventZip,
                    startDate: event.startDate,
                    endDate: event.endDate
                })
                .then(() => history.push("/events"))
            }
        }
    
    return (
        <form className="eventForm">
            <h2 className="eventForm__title">{eventId ? <>Save Event</> : <>Add Event</>}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventName">Event name: </label>
                    <input type="text" id="eventName" name="name" required autoFocus className="form-control" 
                    placeholder="Event name" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.name}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventCity">Event City: </label>
                    <input type="text" id="eventCity" name="eventCity" required autoFocus className="form-control" 
                    placeholder="Event City" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.eventCity}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventState">Event State: </label>
                    <input type="text" id="eventState" name="eventState" required autoFocus className="form-control" 
                    placeholder="Event State" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.eventState}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventZip">Event Zipcode: </label>
                    <input type="text" id="eventZip" name="eventZip" required autoFocus className="form-control" 
                    placeholder="Event Zipcode" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.eventZip}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventStart">Event Start: </label>
                    <input type="date" id="eventStart" name="startDate" required autoFocus className="form-control" 
                    placeholder="Event Start" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.startDate}/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventEnd">Event End: </label>
                    <input type="date" id="eventEnd" name="endDate" required autoFocus className="form-control" 
                    placeholder="Event End" 
                    onChange={handleControlledInputChange} 
                    defaultValue={event.endDate}/>
                </div>
            </fieldset>

            <button className="btn btn-primary"
                disabled={isLoading}
                onClick={event => {
                    event.preventDefault() // Prevent browser from submitting the form
                    constructEventObject()
                }}>
            {eventId ? <>Save Event</> : <>Add Event</>}</button>
        </form>
    )
}