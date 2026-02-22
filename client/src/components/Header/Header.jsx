import "./Header.css";
import theSystemLogo from "../../../public/the-system-logo.svg";
import nav1 from "../../../public/nav1.svg";
import PlayerProfile from "../PlayerProfile/PlayerProfile";

const Header = () => {
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
            <img className="header__nav1-image" src={nav1} alt="Nav Menu" />
          </nav>
        </div>
        <PlayerProfile />
      </div>
    </header>
  );
};

export default Header;
