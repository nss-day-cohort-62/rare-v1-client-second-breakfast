import { useState } from "react"
import { createTag } from "../../managers/TagManager"


export const TagForm = ({getAllTags}) => {
    const [tag, setTag] = useState({})

    const handleInputChange = (evt) => {
        const newTag = {...tag}
        newTag[evt.target.name] = evt.target.value
        setTag(newTag)
    }

    const createANewTag = () => {
        if (tag.label ==="") {
            window.alert("Oops, you need a label!")
        }
        else {
            createTag({
                label: tag.label
            })
            .then(() => getAllTags())
        }
    }

    return <form className="">
      <h2 className="">Create A New Tag</h2>
      <fieldset>
        <div className="tag">
          <label htmlFor="name">Label: </label>
          <input type="text" name="label" required className="form-control"
            placeholder="Enter a new tag label here"
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <button type="submit"
        onClick={evt => {
          evt.preventDefault()
          createANewTag()
        }}
        className="btn btn-primary">
        Save New Tag
      </button>
    </form>
    
}