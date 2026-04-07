/* -------------------------------------------------------------------------- */
/*                              HEADER COMPONENT                              */
/* -------------------------------------------------------------------------- */

import "./Header.css";
import theSystemLogo from "../../../public/the-system-logo.svg";
import nav1 from "../../../public/nav1.svg";
import PlayerProfile from "../PlayerProfile/PlayerProfile";
import PlayerCurrency from "../PlayerCurrency/PlayerCurrency";

const Header = ({ onOpenNavMenu }) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__nav1-container">
          <img
            className="header__logo"
            src={theSystemLogo}
            alt="THE SYSTEM Logo"
          />
          <nav className="header__nav1">
            <button className="header__nav1-button" onClick={onOpenNavMenu}>
              <img className="header__nav1-image" src={nav1} alt="Nav Menu" />
            </button>
          </nav>
        </div>
        <div className="header__profile">
          <PlayerProfile />
          <PlayerCurrency />
        </div>
      </div>
    </header>
  );
};

export default Header;
