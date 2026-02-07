import "./Footer.css";
import theSystemLogo from "../../../public/the-system-logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <img
          className="footer__logo"
          src={theSystemLogo}
          alt="THE SYSTEM Logo"
        />
      </div>
    </footer>
  );
};

export default Footer;
