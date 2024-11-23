// API URL comes from .env.development file
import { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import { Link } from "react-router-dom";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  // Fetch posts form API

  useEffect(() => {
    async function loadPosts() {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const json = await response.json();
          setPosts(json)
        } else {
          throw response;
        }
      } catch (e) {
        setError("An error occurred. Akward...");
        console.log("An error occurred.", e);
        console.log("API_URL:", API_URL);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const deletePost = async(id) => {
    // DELETE request to localhost:3000/api/v1/posts/:id
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setPosts(posts.filter((post) => post.id !== id));
      } else {
        throw response;
      }
    } catch (e) {
      console.log("An error occurred: ", e);
    }
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="post-container">
            <h2>
              <Link to={`/posts/${post.id}`}>
                {post.title}
              </Link>
            </h2>
            <div className="post-links">
            <button onClick={() => deletePost(post.id)}>Delete</button>
            </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
