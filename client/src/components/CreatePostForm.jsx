import React, { useState } from "react";
import axios from "axios";

function CreatePostForm(props) {
  // สร้าง State สำหรับเก็บค่าที่กรอกในฟอร์ม
  const [title, setTitle] = useState(""); // State สำหรับเก็บ Title
  const [content, setContent] = useState(""); // State สำหรับเก็บ Content

  // ฟังก์ชันสำหรับจัดการการ Submit ฟอร์ม
  function handleSubmit(event) {
    event.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อกด Submit

    // เตรียมข้อมูลโพสต์ใหม่
    const newPost = {
      title: title,
      content: content,
    };

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์
    axios
      .post("http://localhost:4000/posts", newPost) // เปลี่ยน URL ตามเซิร์ฟเวอร์ของคุณ
      .then(function (response) {
        console.log("Post created successfully:", response.data);

        // เรียก Callback `onPostCreated` ที่ถูกส่งมาจาก `CreatePostPage`
        if (props.onPostCreated) {
          props.onPostCreated();
        }
      })
      .catch(function (error) {
        console.error("Error creating post:", error);
      });
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>Create Post Form</h1>
      <div className="input-container">
        <label>
          Title
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter title here"
            value={title} // ผูก State `title` กับช่องกรอก
            onChange={function (event) {
              setTitle(event.target.value); // อัปเดต State เมื่อผู้ใช้กรอกข้อมูล
            }}
          />
        </label>
      </div>
      <div className="input-container">
        <label>
          Content
          <textarea
            id="content"
            name="content"
            type="text"
            placeholder="Enter content here"
            rows={4}
            cols={30}
            value={content} // ผูก State `content` กับช่องกรอก
            onChange={function (event) {
              setContent(event.target.value); // อัปเดต State เมื่อผู้ใช้กรอกข้อมูล
            }}
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default CreatePostForm;
