import React from "react";
import AuthService from "../services/auth.service";
import { useAuthContext } from "../context/AuthContext";
import ProfilePic from "../assets/user.png"

const UserProfile = () => {
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar online"
      >
        <div className="w-12 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={ProfilePic}
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>
          <a className="justify-between" href="/userprofile">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
        <li>
          <a onClick={handleLogout}>Logout</a>
        </li>
      </ul>
    </div>
  );
};

export default UserProfile;
