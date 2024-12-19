// Import libraries และ Custom Hook
import { useNavigate } from "react-router-dom";
import useBlogPosts from "../hooks/useBlogPosts";

function ViewPostPage() {
  // ใช้งาน Custom Hook
  const { posts, isError, isLoading } = useBlogPosts();
  const navigate = useNavigate(); // ใช้สำหรับ Navigation

  return (
    <div>
      <h1>View Post Page</h1>
      <div className="view-post-container">
        <h2>Post Title</h2>
        <p>Content</p>
      </div>

      <hr />
      <div className="show-all-posts-container">
        <h2>All Posts</h2>
        {/* วนลูปแสดง Blog Posts */}
        {posts.map(function (post) {
          return (
            <div key={post.id} className="post">
              <h1>{post.title}</h1>
              <div className="post-actions">
                <button
                  className="view-button"
                  onClick={function () {
                    navigate(`/post/view/${post.id}`);
                  }}
                >
                  View post
                </button>
              </div>
            </div>
          );
        })}
        {/* แสดงข้อความ Error ถ้าเกิด Error */}
        {isError ? <h1>Request failed</h1> : null}
        {/* แสดง Loading ระหว่างดึงข้อมูล */}
        {isLoading ? <h1>Loading ....</h1> : null}
      </div>

      <button onClick={function () { navigate("/"); }}>Back to Home</button>
    </div>
  );
}

export default ViewPostPage;
