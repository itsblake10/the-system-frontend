/* -------------------------------------------------------------------------- */
/*                                 MAIN LAYOUT                                */
/* -------------------------------------------------------------------------- */

import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function MainLayout({ onOpenNavMenu, onOpenCopyright, onOpenTos }) {
  return (
    <>
      <Header onOpenNavMenu={onOpenNavMenu} />
      <Outlet />
      <Footer onOpenCopyright={onOpenCopyright} onOpenTos={onOpenTos} />
    </>
  );
}

export default MainLayout;
