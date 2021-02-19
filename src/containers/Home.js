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

  // FAVORIS
  // state etoile favoris qui passera a true ou false au clique et permettra par la suite de suppirmer l'id correpondant du cookie
  // const [starFavorite, setStarFavoris] = useState(false);

  // COOKIES FOR FAVORIS CHARACTERS
  // let newTabFavoris = [];

  const handleFavorite = (character) => {
    let newTabFavoris = [];
    let isExistDeja = false;
    // 1. Au premier clic,Je test si un cookie existe
    if (typeof Cookies.get("CookieFavorisCharacter") === "undefined") {
      // 2. je push dans le tableau mon premier perso
      newTabFavoris.push(character);
      //  3. J'ajoute ensuite ce tableau dans le cookie
      Cookies.set("CookieFavorisCharacter", newTabFavoris);
      // 4. Le premier tour est fini
    } else {
      // 5.Si le cookie n'est pas vide
      // 6. Je copie le cookie + le parse pour le traiter en tant que le tableau
      newTabFavoris = JSON.parse(Cookies.get("CookieFavorisCharacter"));
      // 7.Je cherche dans mon tableau d'objet si le perso est deja présent
      for (let i = 0; i < newTabFavoris.length; i++) {
        if (newTabFavoris[i]._id === character._id) {
          //8. Si je rentre dans cette condition, c'est donc que l'id est deja présent, alors je passe ma variable à true
          isExistDeja = true;
        }
      }
      //9.Si l'id n'est pas deja présent
      if (isExistDeja === false) {
        //10. J'ajoute alors mon perso dans mon tableau
        newTabFavoris.push(character);
        //11. Puis dans mon cookie
        Cookies.set("CookieFavorisCharacter", newTabFavoris);
      }
    }
    console.log(JSON.parse(Cookies.get("CookieFavorisCharacter")));
  };

  // REQUEST
  useEffect(() => {
    console.log("home");
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
                // style={{
                //   border:
                //     starFavorite === true
                //       ? "2px solid yellow"
                //       : "2px solid red",
                // }}
                className="favoriteStar"
                onClick={() => handleFavorite(elem)}
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
