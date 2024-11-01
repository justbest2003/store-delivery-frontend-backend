import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Add from "../pages/Add";
import Edit from "../pages/Edit";
import StoreList from "../pages/StoreList";

//Protect Router
import ProtectAdminOrMod from "../pages/ProtectAdminOrMod";
import ProtectRegister from "../pages/ProtectRegister";
import ProtectStore from "../pages/ProtectStore";
import NotAllowed from "../pages/NotAllowed";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: (
          <ProtectRegister>
            <Register />
          </ProtectRegister>
        ),
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "/add",
        element: (
          <ProtectAdminOrMod>
            <Add />
          </ProtectAdminOrMod>
        ),
      },
      {
        path: "/edit/:id",
        element: (
          <ProtectAdminOrMod>
            <ProtectStore>
            <Edit />
            </ProtectStore>
          </ProtectAdminOrMod>
        ),
      },
      {
        path: "/storelist",
        element: (
          <ProtectAdminOrMod>
            <StoreList />
          </ProtectAdminOrMod>
        ),
      },
      {
        path: "/notallowed",
        element: <NotAllowed />,
      },
    ],
    
  },
]);

export default router;
