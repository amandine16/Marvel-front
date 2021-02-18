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
  let newTabFavoris = [];
  // COOKIES FOR FAVORIS CHARACTERS

  const handleFavorite = (id) => {
    // 1. Au premier clic, je récupère mon cookie
    let newTabFavoris = Cookies.get("CookieFavorisCharacter");
    console.log(newTabFavoris);
    // 2. Je test si un cookie existe
    if (typeof newTabFavoris == "undefined") {
      console.log("premier tour = if cookie vide");
      // 3. Si le cookie n'existe pas, je crée un tableau vide
      newTabFavoris = [];
      // 4. je push dans le tableau mon premier id
      newTabFavoris.push(id);
      //  5. J'ajoute ensuite ce tableau dans le cookie
      Cookies.set("CookieFavorisCharacter", newTabFavoris);
      // 6. Le premier tour est fini
    } else {
      console.log("autre tour que le premier");
      // 7.Au prochain clic, le cookie récupéré n'est pas vide, je rentre donc dans cette condition
      // 8. Je copie le cookie
      const newCookie = Cookies.get("CookieFavorisCharacter");
      // 9.J'enlève tous les guillemets
      const newReplace = newCookie.replaceAll('"', "");
      // 10. J'enlève les crochets de début et de fin
      const newReplaceTwo = newReplace.replace("[", "");
      const newReplaceThree = newReplaceTwo.replace("]", "");
      // 11. Je transforme la string du cookie en tableau pour pusher les id
      newTabFavoris = newReplaceThree.split(",");
      // 12. Je test si l'id cliqué est deja présent dans mon cookie copié
      if (newTabFavoris.indexOf(id) === -1) {
        console.log("lid n'est pas deja present, je l'ajoute");
        // 13. Si l'id n'est pas dejà présent je l'ajoute
        newTabFavoris.push(id);
        // 14. Enfin, j'ajoute au cookie le nouvel id
        Cookies.set("CookieFavorisCharacter", newTabFavoris);
      }
    }
  };

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
