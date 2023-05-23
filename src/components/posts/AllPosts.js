import { useEffect, useState } from "react"
import "./Posts.css"
import { filterPostsByAuthor, filterPostsByCategory, filterPostsBySearch, getPosts } from "../../managers/PostManager"
import { Link, useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getUsers } from "../../managers/UserManager"

export const AllPosts = () => {
    const [posts, setPosts] = useState([])
    const [categories, setCategories] = useState([])
    const [authors, setAuthors] = useState([])
    const [filterByAuthor, setFilterByAuthor] = useState()
    const [filterByCategory, setFilterByCategory] = useState()
    const [ filterBySearch, setFilterBySearch ] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        getPosts().then(postData => setPosts(postData))
    }, [])

    useEffect(() => {
        getPosts().then(postData => {
            const sortedData = postData.sort((a, b) => new Date(b.publication_date) - new Date(a.publication_date))
            setPosts(sortedData)
        })
    }, [])

    useEffect(
        () => {
            getCategories()
                .then((categoryArray) => {
                    setCategories(categoryArray)
                })
        },
        []
    )

    useEffect(
        () => {
            getUsers()
                .then((userArray) => {
                    setAuthors(userArray)
                })
        },
        []
    )

    useEffect(
        () => {
            if (filterByCategory) {
                filterPostsByCategory(filterByCategory)
                    .then((filteredData) => setPosts(filteredData))
            }
        }, [filterByCategory]
    )

    useEffect(
        () => {
            if (filterByAuthor) {
                filterPostsByAuthor(filterByAuthor)
                    .then((filteredData) => setPosts(filteredData))
            }
        }, [filterByAuthor]
    )

    useEffect(
        () => {
            if (filterBySearch) {
                filterPostsBySearch(filterBySearch)
                    .then((filteredData) => setPosts(filteredData))
            }
        }, [filterBySearch]
    )


    return <>
        <section>
            <select
                value={filterByCategory}
                onChange={(evt) => setFilterByCategory(evt.target.value)}>
                <option value="">Category Select</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.label}
                    </option>
                ))}
            </select>
        </section>
        <section>
            <select
                value={filterByAuthor}
                onChange={(evt) => setFilterByAuthor(evt.target.value)}>
                <option value="">Author Select</option>
                {authors.map((author) => (
                    <option key={author.id} value={author.id}>
                        {author.username}
                    </option>
                ))}
            </select>
        </section>
        <section>
            <input type="text" placeholder="Enter text" onChange={
                (changeEvent => {
                    setFilterBySearch(changeEvent.target.value)
                })
            } />
        </section>
        <article className="add__posts">
            <button className="add__posts_button" onClick={() => {
                navigate({ pathname: "/posts/publish" })
            }}>+</button>
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
                return <>
                    <section className="grid__items" key={`post--${post.id}`}>
                        <Link className="post__titles" to={`/posts/${post.id}`}>{post.title}</Link>
                        <div className="post__authors" onClick={() => navigate(`/users/${post.user.user.id}`)}>{post.user.user.username}</div>
                        <div className="post__dates">{post.publication_date}</div>
                        <div className="post__categories">{post.category.label}</div>
                        <div className="post__tags">{post.tag.label}</div>
                    </section>
                </>
            })
        }
    </>
}