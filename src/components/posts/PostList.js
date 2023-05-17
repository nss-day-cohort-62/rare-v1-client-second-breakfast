import { useEffect, useState } from "react"
import { getPosts } from "../../managers/PostManager"

export const PostList = () => {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        getPosts().then(postData => setPosts(postData))
    }, [])

    return <article className="posts">
    {
        posts.map(post => {
            return <section key={`post--${post.id}`} className="post">
                <div className="post__title">{post.title} by {post.user}</div>
                <div className="post__image">{post.image_url}</div>
                <div className="post__content">{post.content}</div>
                <div className="post__publication_date">Published: {post.publication_date}</div>
            </section>
        })
    }
</article>
}