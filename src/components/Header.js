import { Link } from "react-router-dom";
import logoMarvel from "../assets/img/logoMarvel.png";
const Header = ({ url }) => {
  return (
    <div className="Header container">
      <div className="logo">
        <Link to="/">
          <img src={logoMarvel} alt="" />
        </Link>
      </div>
      <div className="nav">
        <ul>
          <li className={url === "/" ? "navLinkActive" : ""}>
            <Link to="/">Personnages</Link>
          </li>
          <li className={url === "/comics" ? "navLinkActive" : ""}>
            <Link to="/comics">Comics</Link>
          </li>
          <li className={url === "/favoris" ? "navLinkActive" : ""}>
            <Link to="/favoris">Favoris</Link>
          </li>
        </ul>
      </div>
      <div className="connexion">
        <div className="logoConnexion"></div>
      </div>
    </div>
  );
};

export default Header;
