import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectRegister = ({ children }) => {
  const { user } = useAuthContext(); 

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectRegister;