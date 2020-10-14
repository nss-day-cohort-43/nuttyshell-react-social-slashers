import React from "react"
import { useHistory } from "react-router-dom"

export const Header = () => {

    const history = useHistory();
    const userId = sessionStorage.getItem("slasherUser");
    const logout = () => {
        sessionStorage.clear(userId);
        history.push("/");
    }
        
    return (
        <>
            <div className="header">
                <h2>Social Slashers</h2>
                <div className="logout">
                    <button className="logout-btn" onClick={logout()}>Log Out</button>
                </div>
            </div>
            
        </>
    )
}