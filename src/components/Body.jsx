import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {/* Ensure the main content grows and pushes the footer to the bottom */}
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
