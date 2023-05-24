import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getCategories } from "../../managers/CategoryManager"
import { getTags } from "../../managers/TagManager"
import { publishPost } from "../../managers/PostManager"

export const PostForm = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [post, updatePost] = useState({
        title: "",
        publication_date: new Date().toISOString().slice(0, 10),
        image_url: "",
        content: "",
        approved: "",
        category: "",
        tag: []
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

    const handleCheckbox = (evt) => {
        const { checked, value } = evt.target;
        if (checked) {
            updatePost((post) => ({
                ...post,
                tag: [...post.tag, parseInt(value)]}))        
        } else {
            // setSelectedTags(selectedTags.filter(tag => tag !== value))
            // updatePost(selectedTags)
            console.log('you have reached this part of the land')
        }
    };

    useEffect(() => {
        console.log(selectedTags);
      }, [selectedTags]);

    const publishButton = (event) => {
        event.preventDefault()

        const postToPublish = {
            title: post.title,
            publication_date: post.publication_date,
            image_url: post.image_url,
            content: post.content,
            approved: true,
            category: parseInt(post.category),
            tag: post.tag.map((tag) => parseInt(tag))
        }

        return publishPost(postToPublish)
            .then((post) => {
                navigate(`/posts/${post.id}`)
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
                                className="form-control-title"
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
                                className="form-control-image"
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
                                className="form-control-content"
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
                                className="form-control-category"
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
                                            className="form-control-tag"
                                            value={tag.id}
                                            checked={post.tag.includes(tag.id)}
                                            onChange={handleCheckbox}
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