import "./Footer.css";
import theSystemLogo from "../../../public/the-system-logo.svg";

const Footer = ({ onOpenCopyright, onOpenTos }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <img
          className="footer__logo"
          src={theSystemLogo}
          alt="THE SYSTEM Logo"
        />
        <ul className="footer__nav">
          <button className="footer__nav-button" onClick={onOpenTos}>
            Terms of Service
          </button>
          <button className="footer__nav-button" onClick={onOpenCopyright}>
            Copyright
          </button>
        </ul>
        <p className="footer__copyright">© All Rights Reserved {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
