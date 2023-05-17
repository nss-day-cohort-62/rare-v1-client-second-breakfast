import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getTags } from "../../managers/TagManager"
import { publishPost } from "../../managers/PostManager"

export const PostForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [post, updatePost] = useState({
        title: "",
        publication_date: "",
        image_url: "",
        content: "",
        approved: "",
        category: "",
        tag: ""
    })

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
            getTags()
                .then((tagsArray) => {
                    setTags(tagsArray)
                })
        },
        []
    )

    const publishButton = (event) => {
        event.preventDefault()

        const postToPublish = {
            title: post.title,
            publication_date: post.publication_date,
            image_url: post.image_url,
            content: post.content,
            approved: true,
            category: parseInt(post.category),
            tag: parseInt(post.tag)
        }

        return publishPost(postToPublish)
            .then(() => {
                navigate("/")
            })
    }

    return <>
            <h2 className="PostForm__title">New Post</h2>
            <form className="postForm">
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                value={post.title}
                                onChange={
                                    (evt) => {
                                        const copy = { ...post }
                                        copy.title = evt.target.value
                                        updatePost(copy)
                                    }
                                } />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Image URL"
                                value={post.image_url}
                                onChange={
                                    (evt) => {
                                        const copy = { ...post }
                                        copy.image_url = evt.target.value
                                        updatePost(copy)
                                    }
                                } />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                            <textarea
                                required autoFocus
                                type="text"
                                className="form-control-band__bio"
                                placeholder="Article content"
                                value={post.content}
                                onChange={
                                    (evt) => {
                                        const copy = { ...post }
                                        copy.content = evt.target.value
                                        updatePost(copy)
                                    }
                                } />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                            <select
                                value={post.category}
                                onChange={
                                    (evt) => {
                                        const copy = { ...post }
                                        copy.category = evt.target.value
                                        updatePost(copy)
                                    }
                                } > <option value="">Category Select</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <div className="input__field">
                                {tags.map((tag) => (
                                    <label key={tag.id} className="checkbox">
                                        <input
                                            type="checkbox"
                                            name="tags"
                                            className="checkbox"
                                            value={tag.id}
                                            // checked={updatedEntry.checked}
                                            // onChange={handleControlledInputChange}
                                            />
                                            {tag.label}
                                    </label>
                                    ))}
                            </div>
                        </div>
                </fieldset>

                <button
                    onClick={(clickEvent) => {
                        publishButton(clickEvent)}}
                    className="btn-publish"><b>
                        Publish
                    </b></button>
            </form>
        </>
}