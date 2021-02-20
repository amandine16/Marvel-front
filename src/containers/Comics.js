import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import starFavoris from "../assets/img/starFavorite.jpg";
import Cookies from "js-cookie";

const Comics = ({ error, setError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState("");
  const [search, setSearch] = useState("");
  const history = useHistory();

  // //   FUNCTION FOR INFO COMICS
  // const handleClickForComicsRelated = (id) => {
  //   history.push("/comics-related", { id: id });
  // };

  // PAGINATION
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);
  let limit = 100;

  // COOKIES FOR FAVORIS CHARACTERS
  let favoris = false;
  // STATE QUI PERMET DE RELANCER LA REQUETE A CHAQUE FOIS QUE LE CONTENU DU COOKIE CHANGE
  const [reloadRequestForFavoris, setReloadRequestForFavoris] = useState(false);
  const handleFavorite = (comics) => {
    //  A chaque clic, je reload ma requete pour que je test si l'id de chaque perso mappé est présent dans mon cookie
    reloadRequestForFavoris
      ? setReloadRequestForFavoris(false)
      : setReloadRequestForFavoris(true);

    let newTabFavoris = [];
    let isExistDeja = false;

    // 1. Au premier clic, Je test si un cookie existe
    if (typeof Cookies.get("CookieFavorisComics") === "undefined") {
      // 2. je push dans le tableau mon premier perso
      newTabFavoris.push(comics);
      //  3. J'ajoute ensuite ce tableau dans le cookie
      Cookies.set("CookieFavorisComics", newTabFavoris);
      // 4. Le premier tour est fini
    } else {
      // 5.Si le cookie n'est pas vide
      // 6. Je copie le cookie + le parse pour le traiter en tant que le tableau
      newTabFavoris = JSON.parse(Cookies.get("CookieFavorisComics"));
      // 7.Je cherche dans mon tableau d'objet si le perso est deja présent
      for (let i = 0; i < newTabFavoris.length; i++) {
        if (newTabFavoris[i]._id === comics._id) {
          //9 Si l'id est deja présent, alors je passe ma variable à true
          isExistDeja = true;
          //10. Cela veut dire que je veux supprimer ce perso de mon cookie
          newTabFavoris.splice(i, 1);
          //11. J'insere mon nouveau tableau avec le perso supprimé dans le cookie
          Cookies.set("CookieFavorisComics", newTabFavoris);
        }
      }

      //12.Si l'id n'est pas deja présent
      if (isExistDeja === false) {
        //13. J'ajoute alors mon perso dans mon tableau
        newTabFavoris.push(comics);
        //14. Puis dans mon cookie
        Cookies.set("CookieFavorisComics", newTabFavoris);
      }
    }
  };
  if (typeof Cookies.get("CookieFavorisComics") !== "undefined") {
    console.log("cookie comics - P-comics");
    console.log(JSON.parse(Cookies.get("CookieFavorisComics")));
  }

  // REQUEST
  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-react.herokuapp.com/comics/?skip=${skip}&limit=${limit}&title=${search}`
        );
        setComics(response.data.results);
        setCount(response.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComics();
  }, [skip, limit, search, reloadRequestForFavoris]);

  return !isLoading ? (
    <div className="Home container">
      {/* SEARCHBAR */}
      <SearchBar setSearch={setSearch} search={search} />
      {/* PAGINATION */}
      <Pagination skip={skip} setSkip={setSkip} limit={limit} count={count} />
      {/* MISSING RESULTS */}
      {comics.length === 0 ? setError("Aucun résultat") : setError("")}
      {error && <span>{error}</span>}
      {/* RESULTS */}
      {comics.map((elem, i) => {
        // Definition de la couleur de l'étoile favoris
        // 1. A chaque map, je mets la variable qui va définir si l'id du perso est présent dans le cookie à false
        favoris = false;
        // 2. Ensuite, jecherche dans le cookie si l'id de mon perso actuel est présent
        if (typeof Cookies.get("CookieFavorisComics") !== "undefined") {
          let cookie = JSON.parse(Cookies.get("CookieFavorisComics"));
          for (let y = 0; y < cookie.length; y++) {
            // 3.Si l'id du perso actuellement mappé est présent dans le cookie, je passe la variable a true
            if (cookie[y]._id === elem._id) {
              // 4.Si la variable passe à true, alors ma couleur d'étoile passe en valide
              favoris = true;
              console.log(favoris);
            }
          }
        }
        return (
          <div className="cardCharacter" id={elem._id} key={i}>
            <div className="imgCharacter">
              <img
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                alt={elem.name}
                // onClick={() => handleClickForComicsRelated(elem._id)}
              />
            </div>
            <div className="infoCharacter">
              <span>{elem.title}</span>
              {elem.description ? (
                <p className="description">
                  {elem.description.slice(0, 50) + "..."}
                </p>
              ) : (
                <p className="missingDescription">Aucune description</p>
              )}
              {/* FAVORITE */}
              {/* Je test ici la varibale favoris de mon perso mappé actuellement, ce qui va définir sa couleur */}
              <div
                style={{
                  border:
                    favoris === true ? "2px solid green" : "2px solid red",
                }}
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

export default Comics;
