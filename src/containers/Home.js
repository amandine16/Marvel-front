import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import starFavoris from "../assets/img/starFavorite.jpg";
import Cookies from "js-cookie";

const Home = ({ error, setError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState("");
  const [search, setSearch] = useState("");
  const history = useHistory();

  //   FUNCTION FOR INFO COMICS
  const handleClickForComicsRelated = (id) => {
    history.push("/comics-related", { id: id });
  };

  // PAGINATION
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);
  let limit = 100;

  const [starFavorite, setStarFavoris] = useState(false);
  // FAVORIS

  // state favoris
  const [favorisCharacter, setFavorisCharacter] = useState([]);
  // fonction au clic sur favoris d'un personnage
  const handleFavorite = (id) => {
    const newTabFavoris = [...favorisCharacter];
    if (newTabFavoris.length === 0) {
      // Si aucun personnage présent, je l'ajoute
      newTabFavoris.push(id);
      setFavorisCharacter(newTabFavoris);
    } else {
      // si le perso est dejà présent je ne l'ajoute pas
      if (newTabFavoris.indexOf(id) === -1) {
        newTabFavoris.push(id);
        setFavorisCharacter(newTabFavoris);
      }
    }
  };
  // COOKIES FOR FAVORIS CHARACTERS
  // Je crée un cookie qui contient tous mes perso favoris ajouté (mon state)
  Cookies.set("CookieFavorisCharacter", favorisCharacter, { expires: 1 });

  // REQUEST
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-react.herokuapp.com/characters/?skip=${skip}&limit=${limit}&name=${search}`
        );
        setCharacters(response.data.results);
        setCount(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCharacters();
  }, [skip, limit, search]);

  return !isLoading ? (
    <div className="Home container">
      {/* SEARCHBAR */}
      <SearchBar setSearch={setSearch} search={search} />
      {/* PAGINATION */}
      <Pagination skip={skip} setSkip={setSkip} limit={limit} count={count} />
      {/* MISSING RESULTS */}
      {characters.length === 0 ? setError("Aucun résultat") : setError("")}
      {error && <span>{error}</span>}
      {/* RESULTS */}
      {characters.map((elem, i) => {
        return (
          <div className="cardCharacter" id={elem._id} key={i}>
            <div className="imgCharacter">
              <img
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                alt={elem.name}
                onClick={() => handleClickForComicsRelated(elem._id)}
              />
            </div>
            <div className="infoCharacter">
              <span>{elem.name}</span>
              {elem.description ? (
                <p className="description">
                  {elem.description.slice(0, 50) + "..."}
                </p>
              ) : (
                <p className="missingDescription">Aucune description</p>
              )}
              {/* FAVORITE */}
              <div
                style={{
                  border:
                    starFavorite === true
                      ? "2px solid yellow"
                      : "2px solid red",
                }}
                className="favoriteStar"
                onClick={() => handleFavorite(elem._id)}
              >
                <img src={starFavoris} alt="" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <span>En attente</span>
  );
};

export default Home;
