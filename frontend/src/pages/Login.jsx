import React from "react";
import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const { login, user: loggedInUser } = useAuthContext();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/");
    }
  }, [loggedInUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const currentUser = await AuthService.login(user.username, user.password);
      if (currentUser.status === 200) {
        login(currentUser.data);
        Swal.fire({
          title: "User Login",
          text: "Login successfully!",
          icon: "success",
        });
        setUser({
          username: "",
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "User Login",
        text: error.response.data.message || error.message,
        icon: "error",
      });
    }
  };

  return (
    <div className="container flex flex-col items-center p-24 mx-auto space-y-6">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center p-2">ลงชื่อเข้าใช้</h1>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="username"
              className="grow"
              placeholder="Username"
              value={user.username}
              onChange={handleChange}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              name="password"
              className="grow"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
            />
          </label>
          <div className="flex justify-between items-center">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div>
          <div className="space-x-2 mt-4 text-center">
            <button class="btn btn-primary" onClick={handleSubmit}>
              ยืนยัน
            </button>
            <button class="btn btn-error">ยกเลิก</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
