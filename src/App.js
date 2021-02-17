// Essential
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./assets/css/font.css";
// Containers
import Home from "./containers/Home";
import Comics from "./containers/Comics";
import Favoris from "./containers/Favoris";
import ComicsRelated from "./containers/ComicsRelated";
// Components
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/comics">
          <Comics />
        </Route>
        <Route path="/comics-related">
          <ComicsRelated />
        </Route>
        <Route path="/favoris">
          <Favoris />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
