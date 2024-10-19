import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectAdminOrMod = ({ children }) => {
  const { user } = useAuthContext();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (
    user.roles.includes("ROLES_ADMIN") ||
    user.roles.includes("ROLES_MODERATOR")
  ) {
    return children;
  }

  return <Navigate to="/" />;
};

export default ProtectAdminOrMod;
