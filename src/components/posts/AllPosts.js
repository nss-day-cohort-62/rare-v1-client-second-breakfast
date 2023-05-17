import { useEffect, useState } from "react"
import "./Posts.css"
import { getPosts } from "../../managers/PostManager"

export const AllPosts = () => {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        getPosts().then(postData => setPosts(postData))
    }, [])

    return <>
    <article className="add__posts">
        <button className="add__posts_button">+</button>
    </article>
    <section className="posts__grid">
        <div className="grid__header">Title</div>
        <div className="grid__header">Author</div>
        <div className="grid__header">Date</div>
        <div className="grid__header">Category</div>
        <div className="grid__header">Tags</div>
    </section>
    {
        posts.map(post => {
            return <section className="grid__items" key={`post--${post.id}`}>
                <div className="post__titles">{post.title}</div>
                <div className="post__authors">{post.user.user.username}</div>
                <div className="post__dates">{post.publication_date}</div>
                <div className="post__categories">{post.category.label}</div>
                <div className="post__tags">{post.tag.label}</div>
            </section>
        })
    }
    </>
}