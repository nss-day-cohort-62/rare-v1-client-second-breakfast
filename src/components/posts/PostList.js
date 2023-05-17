import { useEffect, useState } from "react"
import { getPosts } from "../../managers/PostManager"
import "./Posts.css"

export const PostList = () => {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        getPosts().then(postData => setPosts(postData))
    }, [])

    return <>
    <article className="add__home_posts">
        <button className="add__posts_button">+</button>
    </article>
    <article className="posts">
    {
        posts.map(post => {
            return <section key={`post--${post.id}`} className="post">
                <section className="post__header">
                    <div className="post__title">{post.title}</div>
                    <div className="post__publication_date"> {post.publication_date}</div>
                </section>
                <img className="post__image" src={post.image_url}></img>
                <section className="post__footer">
                    <div className="post__author">Author: <b>{post.user.user.username}</b></div>
                    <div className="post__reaction_count">Reaction count: 0</div>
                </section>
            </section>
        })
    }
</article>
</>
}