import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { EventCard } from "./EventCard"
import { useHistory } from 'react-router-dom';

export const EventList = () => {
   // This state changes when `getEvents()` is invoked below
    const { events, getEvents, setEvents } = useContext(EventContext)
	
	//useEffect - reach out to the world for something
    useEffect(() => {
        getEvents()
        .then((response) => {
            function compare(a, b) {
                const eventA = a.startDate
                const eventB = b.startDate
              
                let comparison = 0;
                if (eventA > eventB) {
                  comparison = 1;
                } else if (eventA < eventB) {
                  comparison = -1;
                }
                return comparison *-1;
              }
              
            response.sort(compare)
            setEvents(response)
        })
    }, [])


    const history = useHistory()

    return (
        <div className="events">
            <h2>Events</h2>
          <button onClick={() => {history.push("/events/create")}}>
                    Add New Event
              </button>
            {
          events.map(event => {
            return <EventCard key={event.id} event={event} />
          })
            }
        </div>
    )
}