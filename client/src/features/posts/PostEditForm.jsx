import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../constants";

function PostEditForm() {
  const [post, setPost] = useState(null);
  const { id } = useParams();
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the current post by id
    const fetchCurrentPost = async () => {
      try {
        const response = await fetch (`${API_URL}/${id}`)
        if (response.ok) {
          const json = await response.json();
          setPost(json);
        } else {
          throw response;
        }
      } catch (e) {
        console.log("An error has occured: ", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchCurrentPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        mode: "cors",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (response.ok) {
        const json = await response.json();
        console.log("Succes", json);
        navigate(`/posts/${id}`);
      } else {
        throw response;
      }
    } catch (e) {
      console.log("An error has occurred: ", e);
    }
  }

  if (!post) return <h2>Loading...</h2>

  return (
    <div>
      <h2>Edit Post</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="post-title">Title</label>
          <br />
          <input
            type="text"
            id="post-title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="bodyInput">Body</label>
          <br />
          <textarea
            type="text"
            id="bodyInput"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
          />
        </div>
        <div>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default PostEditForm;
