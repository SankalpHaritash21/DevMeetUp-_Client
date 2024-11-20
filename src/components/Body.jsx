import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
const Body = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
