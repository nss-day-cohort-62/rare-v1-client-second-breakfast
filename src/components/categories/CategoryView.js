import React, { useEffect, useState } from 'react'

export const Category = () => {
const [category, setCategory] = useState([])

useEffect(() => {
    fetch('http://localhost:8000/category')
        .then(response => response.json())
        .then(data => {
            const sortedData = data.sort((a, b) => a.label.localeCompare(b.label))
            setCategory(sortedData)
        })
    }, [])

return (
<div>
    <h1>Category Management</h1>
    {category.map(category => (
    <div key={category.id}>
        <span>{category.label}</span>
        <button>Edit</button>
        <button>Delete</button>
    </div>
    ))}
</div>
)
}
