import React, { useEffect, useState } from 'react'
import { getCategories, createCategory } from '../../managers/CategoryManager'
import styles from './category.css'

export const Category = () => {
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState({})

    const handleInputChange = (evt) => {
        const newCategory = { ...category }
        newCategory[evt.target.name] = evt.target.value
        setCategory(newCategory)
    }

    const createANewCategory = (e) => {
        e.preventDefault()
        if (category.label === "") {
            window.alert("Oops, you need a label!")
        }
        else {
            createCategory({
                label: category.label
            })
            .then(() => getCategories())
            .then(data => {
                const sortedData = data.sort((a, b) => a.label.localeCompare(b.label))
                setCategories(sortedData)
            })
        }
    }

    useEffect(() => {
        getCategories()
            .then(data => {
                const sortedData = data.sort((a, b) => a.label.localeCompare(b.label))
                setCategories(sortedData)
            })
    }, [])

    return (
        <div className="container">
            <div className="categoryList">
                <h1>Categories</h1>
                {categories.map(category => (
                    <div key={category.id} className="categoryRow">
                        <span>{category.label}</span>
                        <button className="editButton">Edit</button>
                        <button className="deleteButton">Delete</button>
                    </div>
                ))}
            </div>
            <div className="categoryForm">
                <form className="">
                    <h2 className="">Create A New Category</h2>
                    <fieldset>
                        <div className="category">
                        <label htmlFor="name">Label: </label>
                        <input type="text" name="label" required className="form-control"
                            placeholder="Enter a new category label here"
                            onChange={handleInputChange}
                        />
                        </div>
                    </fieldset>
                    <button type="submit"
                        onClick={createANewCategory}
                        className="btn btn-primary">
                        Save New Category
                    </button>
                </form>
            </div>
        </div>
    )
}
