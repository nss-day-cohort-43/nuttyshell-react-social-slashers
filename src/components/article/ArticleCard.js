import React from "react"

export const ArticleCard = ({article}) => (
    <section className="article">
        <h3 className="article__title">{article.title}</h3>
        <div className="article_synopsis">Synopsis: {article.synopsis}</div>
        <div className="article_author">Author: {article.user.name}</div>
        <div className="article_date">Date: {article.dateAdded}</div>
        <div className="article_url">Url: {article.url}</div>
    </section>
)