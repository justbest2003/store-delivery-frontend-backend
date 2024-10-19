import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ProfessorService from "../services/store.service"

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [professor, setProfessor] = useState({
    name: "",
    imageUrl: "",
    department: "",
    position : "",
    email : "",
  });

  useEffect(() => {
    ProfessorService.getProfessorById(id).then((response) => {
      if(response.status === 200){
        setProfessor(response.data)
      }
    })
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfessor({ ...professor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await ProfessorService.editProfessor(id, professor);
        if (response.status === 200) {
            Swal.fire({
                title: "Restaurant Updated",
                text: response.data.message,
                icon: "success", 
            });
            navigate("/lecturer"); 
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
              <span className="label-text">ชื่ออาจารย์</span>
            </label>
            <input
              type="text"
              placeholder="ชื่ออาหาร"
              className="input input-bordered"
              required
              name="name"
              id="name"
              value={professor.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">แผนก</span>
            </label>
            <input
              type="text"
              placeholder="ชื่อสาขา"
              className="input input-bordered"
              required
              name="department"
              id="department"
              value={professor.department}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ตำแหน่ง</span>
            </label>
            <input
              type="text"
              placeholder="รูปอาหาร"
              className="input input-bordered"
              required
              name="position"
              id="position"
              value={professor.position}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">อีเมล</span>
            </label>
            <input
              type="text"
              placeholder="อีเมล"
              className="input input-bordered"
              required
              name="email"
              id="email"
              value={professor.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">URL รูปโปรไฟล์</span>
            </label>
            <input
              type="text"
              placeholder="รูปโปรไฟล์"
              className="input input-bordered"
              required
              name="imageUrl"
              id="imageUrl"
              value={professor.imageUrl}
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
