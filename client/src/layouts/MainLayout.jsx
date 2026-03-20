import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import HeaderNavBar from "../components/HeaderNavBar/HeaderNavBar";

function MainLayout({ onOpenNavMenu, onOpenCopyright, onOpenTos }) {
  return (
    <>
      <Header onOpenNavMenu={onOpenNavMenu} />
      <HeaderNavBar />
      <Outlet />
      <Footer onOpenCopyright={onOpenCopyright} onOpenTos={onOpenTos} />
    </>
  );
}

export default MainLayout;
