import "./NavMenu.css";
import { NavLink } from "react-router-dom";

const NavMenu = () => {
  return (
    <nav className="nav-menu">
      <ul className="nav-menu__list">
        <li className="nav-menu__list-item">
          <NavLink to="/settings" className="nav-menu__link">
            SETTINGS
          </NavLink>
        </li>
        <li className="nav-menu__list-item">
          <NavLink to="/help" className="nav-menu__link">
            HELP
          </NavLink>
        </li>
      </ul>
      <button className="nav-menu__log-out">LOG OUT</button>
    </nav>
  );
};

export default NavMenu;
