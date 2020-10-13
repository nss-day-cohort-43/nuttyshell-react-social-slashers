import React, { useState, createContext, useContext } from "react"
import defaultExport from "../Settings"

/*
    The context is imported and used by individual components
    that need data
*/
export const WeatherContext = createContext()

/*
 This component establishes what data can be used.
 */
export const WeatherProvider = (props) => {
    const [ weather, setWeather] = useState([])
    const [ eventWeather, setEventWeather] = useState([])
    const [ userZip, setUserZip] = useState([])

    const userId = parseInt(sessionStorage.getItem("slasherUser"))
    
    export const getWeather = () => {
        return fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${userZip[0].zipcode},US&units=imperial&appid=${defaultExport.weatherKey}`)
        .then(response => response.json())
        .then(setWeather)
    }
    
    export const getUserZip = () => {
        //fetch user zip code
        return fetch(`http://localhost:8088/users?id=${userId}`)
        .then(response => response.json())
        .then(setUserZip)
    }

    export const getEventWeather = (event) => {
        return fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${event.eventZip},us&appid=${defaultExport.weatherKey}&units=imperial`)
        .then(response => response.json())
        .then(setEventWeather)
    }



    return (
        <WeatherContext.Provider value={{
            weather, getWeather, userZip, getUserZip, getEventWeather, eventWeather
        }}>
            {props.children}
        </WeatherContext.Provider>
    )
}