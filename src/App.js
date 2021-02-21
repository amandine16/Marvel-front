// Essential
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import "./App.scss";
import "./assets/css/font.css";
// Containers
import Home from "./containers/Home";
import Comics from "./containers/Comics";
import Favoris from "./containers/Favoris";
import ComicsRelated from "./containers/ComicsRelated";
// Components
import Header from "./components/Header";
// FontAwesome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
library.add(faAngleDoubleLeft, faAngleDoubleRight);

function App() {
  // STATE FOR GENERAL PAGE
  const [error, setError] = useState("");
  const [errorComics, setErrorComics] = useState("");
  const [errorCharacter, setErrorCharacter] = useState("");
  // Pour changer le placeholder du input de recherche dans les pages
  const [placeHolder, setPlaceHolder] = useState("");
  // Pour mettre en évidence dans le header, la page actuellement consulté
  const [url, setUrl] = useState("");
  return (
    <Router>
      <Header url={url} />
      <Switch>
        <Route path="/comics">
          <Comics
            error={error}
            setError={setError}
            placeHolder={placeHolder}
            setPlaceHolder={setPlaceHolder}
            setUrl={setUrl}
          />
        </Route>
        <Route path="/comics-related">
          <ComicsRelated />
        </Route>
        <Route path="/favoris">
          <Favoris
            errorComics={errorComics}
            setErrorComics={setErrorComics}
            errorCharacter={errorCharacter}
            setErrorCharacter={setErrorCharacter}
            setUrl={setUrl}
          />
        </Route>
        <Route path="/">
          <Home
            error={error}
            setError={setError}
            placeHolder={placeHolder}
            setPlaceHolder={setPlaceHolder}
            setUrl={setUrl}
          />
        </Route>
      </Switch>
    </Router>
  );
}
export default App;
