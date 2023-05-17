import { useEffect, useState } from "react";
import { TagForm } from "./TagForm";
import { getTags } from "../../managers/TagManager"

export const TagList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getTags().then((data) => {
      setTags(data);
    });
  }, []);

  const getAllTags = () => {
    getTags().then((data) => {
      setTags(data);
    });
  };

  return (
    <section>
      <div>
        {tags
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((tag) => {
            return (
              <article>
                <div>{tag.label}</div>
                <button>Edit This Tag</button>
                <button>Delete This Tag</button>
              </article>
            );
          })}
      </div>
      <div>
        <TagForm getAllTags={getAllTags} />
      </div>
    </section>
  );
};
