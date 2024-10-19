import React from 'react';
import Logo from "../assets/Store-Logo.png";
import UserProfile from "./UserProfile";
import LoginButton from "./LoginButton";
import RegisterButton from "./RegisterButton";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuthContext();

  const menus = {
    ROLES_ADMIN: [
      { name: "เพิ่มข้อมูลอาจารย์", link: "/add" },
    ],
    ROLES_MODERATOR: [
      { name: "เพิ่มข้อมูลอาจารย์", link: "/add" },
    ],
    ROLES_USER: [],
    
  };

  const roleAbbreviations = {
    ROLES_ADMIN: "ADMIN",
    ROLES_MODERATOR: "MOD",
    ROLES_USER: "USER",
  };

  return (
    <div className="navbar bg-base-100 shadow-lg p-4">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li><a href='/'>ค้นหาร้านค้า</a></li>
            <li><a href='/'>คณะอาจารย์</a></li>
            <li><a href='/'>หลักสูตร</a></li>
            <li><a href='/'>ข่าวสาร</a></li>
            <li><a href='/'>เอกสาร</a></li>
            {user &&
            menus[user.roles[0]].map((menuItem) => (
              <li key={menuItem.name}>
                <a href={menuItem.link} className='text-red-400 underline'>{menuItem.name}</a>
              </li>
            ))}
            
          </ul>
        </div>
        <a href='/'>
        <img src={Logo} alt="NPRU Logo" className="h-20 w-20 "/></a>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-12 font-bold">
        { <li>
            <a href="/">ค้นหาร้านค้า</a>
          </li> }
        { <li>
            <a href="/">สินค้า</a>
          </li> }

          {user &&
            menus[user.roles[0]].map((menuItem) => (
              <li key={menuItem.name}>
                <a href={menuItem.link} className='text-red-400 underline'>{menuItem.name}</a>
              </li>
            ))}
        </ul>
      </div>

      <div className="navbar-end pr-8">
        {/* ส่วนของ UserProfile จะอยู่ด้านบนสุด */}
        {user && (
          <div className="flex flex-col items-center">
            <UserProfile /> {/* รูปอยู่ด้านบนสุด */}
            <div className="text-center mt-2"> {/* มีการเพิ่ม mt-2 เพื่อเว้นระยะห่าง */}
              <span>Welcome: <span className="font-medium">{user.username}</span></span>
              <div className="space-x-1 font-normal mt-1">
                {user.roles.map((role, index) => (
                  <span
                    key={index}
                    className="badge badge-primary badge-outline text-xs"
                  >
                    {roleAbbreviations[role]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {!user && (
          <div className="space-x-2 flex">
            <LoginButton />
            <RegisterButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
