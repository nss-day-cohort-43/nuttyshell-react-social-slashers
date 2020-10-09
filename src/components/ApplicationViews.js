import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { ArticleList } from './article/ArticleList'
import { ArticleProvider } from "./article/ArticleProvider"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <ArticleProvider>
                <Route exact path="/articles">
                    <ArticleList />
                </Route>
            </ArticleProvider>
        </>
    )
}