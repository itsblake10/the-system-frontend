/* -------------------------------------------------------------------------- */
/*                              HEADER COMPONENT                              */
/* -------------------------------------------------------------------------- */
import "./Header.css";
import PlayerProfile from "../PlayerProfile/PlayerProfile";
import PlayerCurrency from "../PlayerCurrency/PlayerCurrency";
import HeaderNavBar from "../HeaderNavBar/HeaderNavBar";

const Header = ({ onOpenNavMenu }) => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__nav1-container">
          <img
            className="header__logo"
            src="/the-system-logo.svg"
            alt="THE SYSTEM Logo"
          />
          <nav className="header__nav1">
            <button className="header__nav1-button" onClick={onOpenNavMenu}>
              <img
                className="header__nav1-image"
                src="/nav1.svg"
                alt="Nav Menu"
              />
            </button>
          </nav>
        </div>
        <div className="header__profile">
          <PlayerProfile />
          <PlayerCurrency />
        </div>
      </div>
      <HeaderNavBar />
    </header>
  );
};

export default Header;
