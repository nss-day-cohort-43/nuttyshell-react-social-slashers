import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { Slasher } from "./components/Slasher.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Slasher />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)