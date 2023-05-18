import { useEffect, useState } from "react"
import { getPosts } from "../../managers/PostManager"

export const MyPost = () => {
    //i am attempting to create a page where only the user that is logged in can view their posts. so it seems as though i would still need to bring in the overall posts, but i would have to filter it to where only when the logged in token matches the correct posts attached to that token
    const [posts, setPosts] = useState([])
    const [filteredPost, setFilteredPosts] = useState([])
    const localUser = localStorage.getItem("auth_token")
    const userObject = JSON.parse(localUser)

    useEffect(
        () => {
            getPosts().then(
                (data) => {
                    setPosts(data)
                }
            )
        }, []
    )

    useEffect(
        () => {
            if (userObject) {
                setFilteredPosts(posts)
            }
        }, [posts]
    )
    return <>
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