import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import StoreService from "../services/store.service";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProtectStore = ({ children }) => {
  const { id } = useParams(); // ดึง storeId (id) จาก URL
  const { user } = useAuthContext(); 
  const [isOwner, setIsOwner] = useState(null); // ใช้สถานะในการตรวจสอบ

  useEffect(() => {
    if (!id) {
      console.error("ไม่มี storeId");
      setIsOwner(false); // ถ้าไม่มี storeId
      return;
    }

    const fetchStoreOwner = async () => {
      try {
        const response = await StoreService.getStoreById(id); // ใช้ id ที่ดึงมา
        setIsOwner(user.id === response.data.userId); // ตรวจสอบว่าเป็นเจ้าของหรือไม่
      } catch (error) {
        console.error("เกิดข้อผิดพลาดในการดึงข้อมูลเจ้าของร้าน:", error);
        setIsOwner(false); // กำหนดเป็น false ถ้าเกิดข้อผิดพลาด
      }
    };

    fetchStoreOwner();
  }, [id, user.id]);

  // รอให้ตรวจสอบเสร็จสิ้นก่อนที่จะเรนเดอร์ children
  if (isOwner === null) {
    return null; // หรืออาจคืนค่า Loading หรือ Placeholder
  }

  // ถ้าไม่ใช่เจ้าของให้เปลี่ยนเส้นทางไปหน้าแรก
  if (!isOwner) {
    return <Navigate to="/notallowed" />;
  }

  return children; // ส่ง children กลับไป
};

export default ProtectStore;
