import React, { useContext, useEffect } from "react"
import { EventContext } from "./EventProvider"
import { FriendContext } from "../friends/FriendProvider"
import { EventCard, FriendEventCard } from "./EventCard"
import { useHistory } from 'react-router-dom';
import "./Event.css"

export const EventList = () => {
   // This state changes when `getEvents()` is invoked below
    const { events, getEvents, allEvents, getAllEvents } = useContext(EventContext)
    const { friends, getFriends } = useContext(FriendContext)

    const userId = sessionStorage.getItem("slasherUser")

    const friendEvents = allEvents.filter((event) => {
      for (const friend of friends) {
        if (friend.userId === event.userId) {
          return event
        }
      }
    })
  
	//useEffect - reach out to the world for something
    useEffect(() => {
      getEvents(userId)
      getFriends()
      getAllEvents()
    }, [])

    const history = useHistory()

    //returns list of events, with future ones displayed in a higher container
    //past events are listed oldest to newest
    //future events are listed soonest to latest
    return (
      <>
        <div className="eventsContainer">
          <div className="events">
            <h2>Your Events</h2>
            <button onClick={() => {history.push("/events/create")}}>
                      Add New Event
            </button>
            <h3>Upcoming Events</h3>
            <div className="events__future">
              {
            events.map(event => {
              if(event.startDate >= Date.now()){
                return <EventCard key={event.id} event={event} />}
            })
              }</div>
            <h3>Past Events</h3>
            <div className="events__past">
              {
            events.map(event => {
              if(event.startDate < Date.now()){
                return <EventCard key={event.id} event={event} />}
            })
              }</div>
          </div>

          <div className="friend__events">
          <h2>Friends' Events</h2>
          <h3>Upcoming Events</h3>
          <div className="events__future">
            {
          friendEvents.map(event => {
            if(event.startDate >= Date.now()){
              return <FriendEventCard key={event.id} event={event} />}
          })
            }</div>
          <h3>Past Events</h3>
          <div className="events__past">
            {
          friendEvents.map(event => {
            if(event.startDate < Date.now()){
              return <FriendEventCard key={event.id} event={event} />}
          })
            }</div>
        </div>
      </div>
    </>
    )
}