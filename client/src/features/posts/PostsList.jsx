// API URL comes from .env.development file
import { useState, useEffect } from "react";
import { deletePost, fetchAllPosts } from "../../services/postService";
import { Link } from "react-router-dom";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [, setLoading] = useState(true);
  const [, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await fetchAllPosts();
        setPosts(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const deletePostHandler = async(id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
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
            <button onClick={() => deletePostHandler(post.id)}>Delete</button>
            </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
