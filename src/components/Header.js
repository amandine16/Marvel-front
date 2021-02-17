import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header container">
      <div className="logo">
        <Link to="/">
          <span>MARVEL</span>
        </Link>
      </div>
      <div className="nav">
        <ul>
          <li>
            <Link to="/">Personnages</Link>
          </li>
          <li>
            <Link to="/comics">Comics</Link>
          </li>
          <li>
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
