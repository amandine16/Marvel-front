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
// Cookies

function App() {
  // STATE FOR GENERAL PAGE
  const [error, setError] = useState("");
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/comics">
          <Comics error={error} setError={setError} />
        </Route>
        <Route path="/comics-related">
          <ComicsRelated />
        </Route>
        <Route path="/favoris">
          <Favoris />
        </Route>
        <Route path="/">
          <Home error={error} setError={setError} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
