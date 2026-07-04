/* -------------------------------------------------------------------------- */
/*                               NAV MENU MODAL                               */
/* -------------------------------------------------------------------------- */
import "./NavMenu.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";

const NavMenu = ({ handleModalClose }) => {
  const { logout } = useContext(PlayerContext) || {};

  /* --------------------------------- LOGOUT --------------------------------- */
  const handleLogout = () => {
    logout();
    handleModalClose();
  };

  return (
    <nav className="nav-menu">
      <ul className="nav-menu__list">
        <li className="nav-menu__list-item">
          <NavLink to="/game" className="nav-menu__link">
            GAME
          </NavLink>
        </li>
        <li className="nav-menu__list-item">
          <NavLink to="/player" className="nav-menu__link">
            PLAYER
          </NavLink>
        </li>
        <li className="nav-menu__list-item">
          <NavLink to="/account" className="nav-menu__link">
            ACCOUNT
          </NavLink>
        </li>
        <li className="nav-menu__list-item">
          <NavLink to="/help" className="nav-menu__link">
            HELP
          </NavLink>
        </li>
      </ul>
      <button className="nav-menu__log-out" onClick={handleLogout}>
        LOG OUT
      </button>
    </nav>
  );
};

export default NavMenu;
