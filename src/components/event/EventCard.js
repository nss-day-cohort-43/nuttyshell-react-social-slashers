import React from "react"
import { Link } from "react-router-dom"

//defines html for each event
export const EventCard = ({ event }) => {
    return (
    <section className="event">
        <h3 className="event__name">
            <Link to={`/events/detail/${event.id}`}>
                { event.name }
            </Link>
        </h3>
        <div className="event__times">{new Date(event.startDate).toLocaleDateString('en-US')}
         - {new Date(event.endDate).toLocaleDateString('en-US')}
        </div>
    </section>)
}

//defines html for each event
export const FriendEventCard = ({ event }) => {
    return (
    <section className="event">
        <h3 className="event__name">
            { event.name }
        </h3>
    <div className="organizer">Organizer: {event.user.name}</div>
        <div className="event__times">{new Date(event.startDate).toLocaleDateString('en-US')}
         - {new Date(event.endDate).toLocaleDateString('en-US')}
        </div>
        <div className="event__location">{event.eventCity}, {event.eventState} {event.eventZip}</div>
    </section>)
}