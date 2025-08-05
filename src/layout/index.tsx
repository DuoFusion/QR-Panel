import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setSideBarToggle } from "../store/slices/LayoutSlice";
import Footer from "./footer";
import Header from "./header";
import Sidebar from "./Sidebar";

const Layout = () => {
  const dispatch = useAppDispatch();
  const updateSidebarBasedOnWidth = () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= 1200) dispatch(setSideBarToggle(true));
    else dispatch(setSideBarToggle(false));
  };
  useEffect(() => {
    updateSidebarBasedOnWidth();
    window.addEventListener("resize", () => updateSidebarBasedOnWidth());
  }, []);

  return (
    <div className="page-wrapper compact-wrapper">
      <Header />
      <div className="page-body-wrapper">
        <Sidebar />
        <div className="page-body">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
