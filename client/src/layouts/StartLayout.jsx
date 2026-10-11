/* -------------------------------------------------------------------------- */
/*                                START LAYOUT                                */
/* -------------------------------------------------------------------------- */

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";

function StartLayout() {
  return (
    <>
      <img
        className="start__logo"
        src="/the-system-logo.svg"
        alt="THE SYSTEM Logo"
      />
      <Outlet />
      <Footer />
    </>
  );
}

export default StartLayout;
