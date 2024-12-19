import { useNavigate } from "react-router-dom";
import EditPostForm from "../components/EditPostForm";

function EditPostPage() {
  // สร้าง Hook useNavigate เพื่อใช้ Redirect ผู้ใช้งาน
  const navigate = useNavigate();

  // ฟังก์ชันสำหรับการแก้ไขโพสต์สำเร็จ
  function handlePostUpdated() {
    // Redirect กลับไปหน้า Home
    navigate("/");
  }

  return (
    <div>
      <h1>Edit Post Page</h1>
      {/* ส่ง Callback handlePostUpdated ไปที่ EditPostForm */}
      <EditPostForm onPostUpdated={handlePostUpdated} />
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
}

export default EditPostPage;
