import React, { useState } from "react";
import Swal from 'sweetalert2';
import StoreService from "../services/store.service";
import { useAuthContext } from "../context/AuthContext";
const Add = () => {
  const { user } = useAuthContext();
  const [store, setStore] = useState({
    storeName: "",
    address: "",
    lat: "",
    lng: "",
    deliveryRadius: "",
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore({ ...store, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Include the userId from AuthContext in the store data
      const storeWithUser = { ...store, userId: user.id };
      
      const response = await StoreService.insertStore(storeWithUser);
      if (response.status === 200) {
        Swal.fire({
          title: 'Add Store',
          text: "Store Added Successfully",
          icon: 'success'
        });
        setStore({
          storeName: "",
          address: "",
          lat: "",
          lng: "",
          deliveryRadius: "",
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Add Store',
        text: error.response?.data?.message || error.message,
        icon: 'error'
      });
    }
  };
  

  return (
    <div className="container flex flex-col items-center p-4 mx-auto space-y-6">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ชื่อร้านค้า</span>
            </label>
            <input
              type="text"
              placeholder="ชื่อร้านค้า"
              className="input input-bordered"
              required
              name="storeName"
              value={store.storeName}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ที่อยู่</span>
            </label>
            <input
              type="text"
              placeholder="ที่อยู่"
              className="input input-bordered"
              required
              name="address"
              value={store.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ละติจูด</span>
            </label>
            <input
              type="text"
              placeholder="ละติจูด"
              className="input input-bordered"
              required
              name="lat"
              value={store.lat}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ลองจิจูด</span>
            </label>
            <input
              type="text"
              placeholder="ลองจิจูด"
              className="input input-bordered"
              required
              name="lng"
              value={store.lng}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ระยะการจัดส่ง (กม.)</span>
            </label>
            <input
              type="text"
              placeholder="ระยะการจัดส่ง"
              className="input input-bordered"
              required
              name="deliveryRadius"
              value={store.deliveryRadius}
              onChange={handleChange}
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary" type="submit">
              เพิ่มข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;
