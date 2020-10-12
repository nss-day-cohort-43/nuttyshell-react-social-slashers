import React, {useContext} from "react"
import { ArticleContext } from "./ArticleProvider"
import { useHistory } from 'react-router-dom';

// Used to render users articles. Will also enable deleting and editing of these articles.
export const MyArticleCard = ({article}) => {
    // We need this so that we can can direct user to edit their articles
    const history = useHistory()
    // Bring these functions from context
    const { getArticles, deleteArticle} = useContext(ArticleContext)
    return (
    <section className="article">
        <h3 className="article__title">{article.title}</h3>
        <div className="article_synopsis">Synopsis: {article.synopsis}</div>
        <div className="article_date">Date: {new Date(article.dateAdded).toLocaleDateString('en-US')}</div>
        <div className="article_url">URL: {article.url}</div>
        <div className="article_author">Author: {article.user.name}</div>
        <button onClick={
    			() => {
                    deleteArticle(article.id)
                    .then(() => {
                        history.push("/articles")
                        getArticles()
        		    })
    			}}>Delete Article
			</button>
            <button onClick={() => {
				history.push(`/articles/edit/${article.id}`)
				}}>Edit
			</button>
    </section>
    )
}

// Used to render friend Articles. Omits the ability to edit / delete the article
export const FriendArticleCard = ({article}) => {
    return (
    <section className="article">
        <h3 className="article__title">{article.title}</h3>
        <div className="article_synopsis">Synopsis: {article.synopsis}</div>
        <div className="article_date">Date: {new Date(article.dateAdded).toLocaleDateString('en-US')}</div>
        <div className="article_url">URL: {article.url}</div>
        <div className="article_author">Author: {article.user.name}</div>
    </section>
    )
}