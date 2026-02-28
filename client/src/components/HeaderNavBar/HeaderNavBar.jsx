import "./HeaderNavBar.css";
import { NavLink } from "react-router-dom";

const HeaderNavBar = () => {
  return (
    <nav className="header-nav-bar">
      <ul className="header-nav-bar__list">
        <li className="header-nav-bar__list-item">
          <NavLink to="/home" className="header-nav-bar__link">
            HOME
          </NavLink>
        </li>
        <li className="header-nav-bar__list-item">
          <NavLink to="/raids" className="header-nav-bar__link">
            RAIDS
          </NavLink>
        </li>
        <li className="header-nav-bar__list-item">
          <NavLink to="/inventory" className="header-nav-bar__link">
            INVENTORY
          </NavLink>
        </li>
        <li className="header-nav-bar__list-item">
          <NavLink to="/shop" className="header-nav-bar__link">
            SHOP
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavBar;
