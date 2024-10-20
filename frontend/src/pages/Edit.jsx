import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import StoreService from "../services/store.service";
import { useAuthContext } from "../context/AuthContext";

const Edit = () => {
  const { user } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [store, setStore] = useState({
    storeName: "",
    address: "",
    lat: "",
    lng: "",
    deliveryRadius: "",
    direction: "",
  });

  useEffect(() => {
    const fetchStore = async () => {
      const response = await StoreService.getStoreById(id);
      if (response.status === 200) {
        setStore(response.data);
        // ตรวจสอบว่า user.id ตรงกับ store.userId หรือไม่
        if (user.id !== response.data.userId) {
          Swal.fire({
            title: "Access Denied",
            text: "You do not have permission to edit this store.",
            icon: "error",
          });
          navigate("/"); // เปลี่ยนเส้นทางไปยังหน้าอื่น
        }
      }
    };
    fetchStore();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore({ ...store, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const storeWithUser = { ...store, userId: user.id };
        const response = await StoreService.editStore(id, storeWithUser);
        if (response.status === 200) {
            Swal.fire({
                title: "Restaurant Updated",
                text: response.data.message,
                icon: "success", 
            });
            navigate("/"); 
        }
    } catch (error) {
        Swal.fire({
            title: "Restaurant Update Failed",
            text: error?.response?.data?.message || error.message,
            icon: "error",
        });
    }
};


  return (
    <div className="container flex flex-col items-center p-4 mx-auto space-y-6">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Store Name</span>
            </label>
            <input
              type="text"
              placeholder="ชื่อร้านค้า"
              className="input input-bordered"
              required
              name="storeName"
              id="storeName"
              value={store.storeName}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              placeholder="ที่อยู่"
              className="input input-bordered"
              required
              name="address"
              id="address"
              value={store.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Latitude</span>
            </label>
            <input
              type="number"
              placeholder="ละติจูด"
              className="input input-bordered"
              required
              name="lat"
              id="lat"
              value={store.lat}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Longitude</span>
            </label>
            <input
              type="number"
              placeholder="ลองจิจูด"
              className="input input-bordered"
              required
              name="lng"
              id="lng"
              value={store.lng}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Delivery Radius</span>
            </label>
            <input
              type="number"
              placeholder="ระยะการจัดส่ง (กม.)"
              className="input input-bordered"
              required
              name="deliveryRadius"
              id="deliveryRadius"
              value={store.deliveryRadius}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Direction</span>
            </label>
            <input
              type="text"
              placeholder="ระยะการจัดส่ง (กม.)"
              className="input input-bordered"
              required
              name="direction"
              id="direction"
              value={store.direction}
              onChange={handleChange}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit" onClick={handleSubmit}>
            อัพเดทข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
