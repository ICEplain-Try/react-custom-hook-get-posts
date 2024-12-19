import { useNavigate } from "react-router-dom";
import CreatePostForm from "../components/CreatePostForm";
import useBlogPosts from "../hooks/useBlogPosts"; // Import Custom Hook

function CreatePostPage() {
  const navigate = useNavigate();
  const { getPosts } = useBlogPosts(); // ดึงฟังก์ชัน getPosts จาก Custom Hook

  // ฟังก์ชันสำหรับการสร้างโพสต์สำเร็จ
  function handlePostCreated() {
    // ดึงข้อมูลใหม่จากเซิร์ฟเวอร์
    getPosts();
    // Redirect กลับไปหน้า Home
    navigate("/");
  }

  return (
    <div>
      <h1>Create Post Page</h1>
      {/* ส่ง Callback handlePostCreated ไปที่ CreatePostForm */}
      <CreatePostForm onPostCreated={handlePostCreated} />
      <button onClick={function () { navigate("/"); }}>Back to Home</button>
    </div>
  );
}

export default CreatePostPage;
