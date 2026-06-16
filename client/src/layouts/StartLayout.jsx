/* -------------------------------------------------------------------------- */
/*                                START LAYOUT                                */
/* -------------------------------------------------------------------------- */

import { Outlet } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import theSystemLogo from "./../../public/the-system-logo.svg";

function StartLayout() {
  return (
    <>
      <img className="start__logo" src={theSystemLogo} alt="THE SYSTEM Logo" />
      <Outlet />
      <Footer />
    </>
  );
}

export default StartLayout;
