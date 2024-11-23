import Footer from "./Footer";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import useFetchUser from "../hooks/useFetchUser";

const Body = () => {
  useFetchUser(); // Hook handles user fetching

  return (
    <div className="flex flex-col min-h-screen select-none">
      <NavBar />
      {/* Main content section */}
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
