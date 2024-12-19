// Import libraries ที่จำเป็น
import { useState, useEffect } from "react";
import axios from "axios";

// สร้าง Custom Hook ชื่อ useBlogPosts
function useBlogPosts() {
  // สร้าง State สำหรับเก็บข้อมูล Blog Posts
  const [posts, setPosts] = useState([]);
  // สร้าง State สำหรับเก็บสถานะ Error
  const [isError, setIsError] = useState(false);
  // สร้าง State สำหรับเก็บสถานะ Loading
  const [isLoading, setIsLoading] = useState(false);
  // สร้าง State สำหรับสถานะการอัปเดตข้อมูล (ไม่ล้างข้อมูลเดิมระหว่างโหลด)
  const [isUpdating, setIsUpdating] = useState(false);

  // ฟังก์ชันสำหรับดึงข้อมูล Blog Posts จาก Server
  function getPosts() {
    // ระบุสถานะกำลังอัปเดตข้อมูล
    setIsUpdating(true);

    // เริ่มต้นการดึงข้อมูล
    axios("http://localhost:4000/posts")
      .then(function (results) {
        // เก็บข้อมูลที่ได้จาก Server ลงใน State
        setPosts(results.data.data);
        setIsLoading(false); // หยุดสถานะ Loading
        setIsUpdating(false); // หยุดสถานะการอัปเดตข้อมูล
      })
      .catch(function (error) {
        // จัดการ Error
        setIsError(true);
        setIsLoading(false); // หยุดสถานะ Loading
        setIsUpdating(false); // หยุดสถานะการอัปเดตข้อมูล
      });
  }

  // ดึงข้อมูลครั้งแรกเมื่อ Component ที่ใช้ Hook นี้ Render
  useEffect(function () {
    setIsLoading(true); // กำหนดสถานะ Loading ตอนเริ่มต้น
    getPosts();
  }, []);

  // Return ค่าเป็น Object ที่มี posts, isError, isLoading, isUpdating และฟังก์ชัน getPosts
  return {
    posts: posts,
    setPosts: setPosts, // เพิ่ม setPosts เพื่อให้ Component ภายนอกใช้งานได้
    isError: isError,
    isLoading: isLoading,
    isUpdating: isUpdating, // สถานะการอัปเดตข้อมูล
    getPosts: getPosts,
  };
}

export default useBlogPosts;
