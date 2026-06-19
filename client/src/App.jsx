import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfileThunk } from "./store/slice/user/user.thunk";
import { Toaster } from "react-hot-toast";

export default function App() {
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log("isAuthenticated:", isAuthenticated);

  useEffect(() => {
    dispatch(getUserProfileThunk());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      if (location.pathname === "/" || location.pathname === "/login" || location.pathname === "/signup") {
        navigate("/home");
      }
    } else {
      if (location.pathname === "/") {
        navigate("/login");
      }
    }
  }, [isAuthenticated, navigate, location.pathname]);

  return (
    <div className="h-screen w-screen bg-base-300 flex flex-col overflow-hidden">
      <Outlet />
      <Toaster />
    </div>
  );
}