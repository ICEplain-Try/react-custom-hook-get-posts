// Import libraries และ Custom Hook
import { useNavigate } from "react-router-dom";
import useBlogPosts from "../hooks/useBlogPosts";
import axios from "axios";

function HomePage() {
  // ใช้งาน Custom Hook
  const { posts, setPosts, isError, isLoading } = useBlogPosts(); // เพิ่ม setPosts เพื่ออัปเดต State หลังลบโพสต์
  const navigate = useNavigate(); // ใช้สำหรับ Navigation

  // ฟังก์ชันสำหรับลบโพสต์
  function deletePost(postId) {
    // ทำการลบโพสต์จาก Server
    axios
      .delete("http://localhost:4000/posts/" + postId)
      .then(function (response) {
        // หลังจากลบสำเร็จ อัปเดต State โดยกรองโพสต์ที่ถูกลบออก
        const updatedPosts = posts.filter(function (post) {
          return post.id !== postId;
        });
        setPosts(updatedPosts); // อัปเดต State
        console.log("Post deleted successfully");
      })
      .catch(function (error) {
        // จัดการ Error ถ้ามีปัญหา
        console.error("Error deleting post:", error);
      });
  }

  return (
    <div>
      <div className="app-wrapper">
        <h1 className="app-title">Posts</h1>
        <button onClick={function () { navigate("/post/create"); }}>
          Create Post
        </button>
      </div>
      <div className="board">
        {/* วนลูปแสดง Blog Posts */}
        {posts.map(function (post) {
          return (
            <div key={post.id} className="post">
              <h1>{post.title}</h1>
              <div className="post-actions">
                <button
                  className="view-button"
                  onClick={function () { navigate(`/post/view/${post.id}`); }}
                >
                  View post
                </button>
                <button
                  className="edit-button"
                  onClick={function () { navigate(`/post/edit/${post.id}`); }}
                >
                  Edit post
                </button>
              </div>
              {/* ปุ่มสำหรับลบโพสต์ */}
              <button
                className="delete-button"
                onClick={function () { deletePost(post.id); }}
              >
                x
              </button>
            </div>
          );
        })}
        {/* แสดงข้อความ Error ถ้าเกิด Error */}
        {isError ? <h1>Request failed</h1> : null}
        {/* แสดง Loading ระหว่างดึงข้อมูล */}
        {isLoading ? <h1>Loading ....</h1> : null}
      </div>
    </div>
  );
}

export default HomePage;
