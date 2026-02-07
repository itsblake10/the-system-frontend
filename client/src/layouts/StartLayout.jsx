import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function StartLayout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default StartLayout;
