import React, { useContext, useEffect, useState } from "react"
import { WeatherContext } from "./WeatherProvider"
import { useParams } from "react-router-dom"
import { EventContext } from "../event/EventProvider"

//defines html for weather
export const WeatherCard = () => {
    //defines info used
    const { eventWeather, getEventWeather } = useContext(WeatherContext)
    const { getEventById } = useContext(EventContext)

    //sets state change when event is changed
    const [event, setEvent] = useState({})

    //gets the eventId
    const {id} = useParams()

    //finds relevant weather in API
    const weatherNeeded = eventWeather.list?.find(weatherObj => {
        return (event?.startDate)/1000 === weatherObj.dt
    })

    //gets event and corresponding weather info
    useEffect(() => {
        getEventById(id)
        .then((response) => {
            setEvent(response)
            getEventWeather(response)
        })
    }, [])

    //conversions for checking if event is within 5 days
    const eventDate = Math.floor(event.startDate / (1000*60*60*24))
    const currentDate = new Date()
    const currentDateDays = Math.floor(currentDate.getTime()/ (1000*60*60*24))

    //defines html for weather given that weather properly runs
    const weatherFinder = () => {
        if(weatherNeeded){
            if( eventDate - currentDateDays <= 5 && eventDate - currentDateDays >= 0){
                return (
                    <section className="weather">
                        <h3 className="weatherHeader">Event Forecast</h3>
                        <div className="weather-description">{weatherNeeded.weather[0].description}</div>
                        <div className="weather-temp">Temperature:{weatherNeeded.main.temp}°F</div>
                        <div className="weather-feeling">Feels Like: {weatherNeeded.main.feels_like}°F</div>
                    </section>
                )
            }
            else {
                return (
                    <section className="weather">No Weather to Show</section>
                )
            }
        }
        else {
            return (
                <section className="weather">No Weather to Show</section>
            )
        }
    }
    
    //runs the funtion that defines the html
    return (
        <section className="weather">
            {weatherFinder()}
        </section>
    )

}

