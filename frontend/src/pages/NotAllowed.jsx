import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import notAllowedImg from "../assets/no-entry.png";

const NotAllowed = () => {
  const [counter, setCounter] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 10000);

    const countDown = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(countDown);
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countDown);
    };
  }, [navigate]);

  return (
    <div className="container flex flex-col items-center p-8 mx-auto space-y-6">
      <div className="card bg-base-100 w-96 shadow-xl">
        <figure className="px-10 pt-10">
          <img src={notAllowedImg} alt="NotAllowed" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">Page Not Allowed!</h2>
          <p>You are not allowed to access this page</p>
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content items-center">
          <span className="countdown font-mono text-5xl">
            <span style={{ "--value": counter }}></span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
};

export default NotAllowed;