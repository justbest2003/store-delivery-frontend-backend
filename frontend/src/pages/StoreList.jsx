import React, { useState, useEffect } from "react";
import StoreService from "../services/store.service";
import Swal from "sweetalert2";
import { useAuthContext } from "../context/AuthContext"; // นำเข้า AuthContext

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const { user } = useAuthContext(); // ดึงข้อมูลผู้ใช้จาก AuthContext

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await StoreService.getAllStore();
        // กรองร้านค้าเพื่อแสดงเฉพาะร้านค้าที่เจ้าของเป็น user.id
        const userStores = response.data.filter(store => store.userId === user.id);
        setStores(userStores);
      } catch (error) {
        console.error("Error fetching stores:", error);
      }
    };

    fetchStores();
  }, [user.id]); // เพิ่ม user.id เป็น dependency

  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "คุณแน่ใจแล้วใช่มั้ย?",
      text: "คุณต้องการที่จะลบร้านค้านี้ใช่มั้ย? ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ไม่, ยกเลิก!",
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await StoreService.deleteStore(id);
        if (response.status === 200) {
          Swal.fire({
            title: "Store Deleted",
            text: response.data.message,
            icon: "success",
          }).then(() => {
            window.location.reload();
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Store Deletion Failed",
          text: error?.response?.data?.message || error.message,
          icon: "error",
        });
      }
    }
  };

  return (
    <div className="table-container flex justify-center items-center pt-10">
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr className="font-bold text-base">
              <th>StoreName</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{store.storeName}</div>
                      <div className="text-sm opacity-50">
                        {store.address}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="flex items-center justify-center gap-3">
                  <a
                    href={`/edit/${store.id}`}
                    className="btn btn-xs btn-warning !text-black"
                    type="button"
                  >
                    แก้ไข
                  </a>
                  <button className="btn btn-error btn-xs" onClick={() => handleDelete(store.id)}>ลบร้านค้า</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreList;
