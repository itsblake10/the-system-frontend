import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import HeaderNavBar from "../components/HeaderNavBar/HeaderNavBar";

function MainLayout() {
  return (
    <>
      <Header />
      <HeaderNavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
