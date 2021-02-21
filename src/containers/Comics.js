import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import starFavoris from "../assets/img/starFavoris.jpg";
import starFavorisBlanc from "../assets/img/starFavorisBlanc.jpg";
import Cookies from "js-cookie";
import loading from "../assets/img/loading.jpg";

const Comics = ({ error, setError, placeHolder, setPlaceHolder, setUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState("");
  const [search, setSearch] = useState("");
  // Je change le placeholder du input de recherche
  setPlaceHolder("comics");
  // Je récupère l'url de la page
  setUrl(window.location.pathname);

  // PAGINATION
  const [skip, setSkip] = useState(0);
  const [count, setCount] = useState(0);
  let limit = 100;

  // COOKIES FOR FAVORIS CHARACTERS
  let favoris = false;
  // STATE QUI PERMET DE RELANCER LA REQUETE A CHAQUE FOIS QUE LE CONTENU DU COOKIE CHANGE
  const [reloadRequestForFavoris, setReloadRequestForFavoris] = useState(false);
  const handleFavorite = (comics) => {
    //  A chaque clic, je reload ma requete pour que je test si l'id de chaque comics mappé est présent dans mon cookie
    reloadRequestForFavoris
      ? setReloadRequestForFavoris(false)
      : setReloadRequestForFavoris(true);

    let newTabFavoris = [];
    let isExistDeja = false;

    // 1. Au premier clic, Je test si un cookie existe
    if (typeof Cookies.get("CookieFavorisComics") === "undefined") {
      // 2. je push dans le tableau mon premier comics
      newTabFavoris.push(comics);
      //  3. J'ajoute ensuite ce tableau dans le cookie
      Cookies.set("CookieFavorisComics", newTabFavoris);
      // 4. Le premier tour est fini
    } else {
      // 5.Si le cookie n'est pas vide
      // 6. Je copie le cookie + le parse pour le traiter en tant que le tableau
      newTabFavoris = JSON.parse(Cookies.get("CookieFavorisComics"));
      // 7.Je cherche dans mon tableau d'objet si le comics est deja présent
      for (let i = 0; i < newTabFavoris.length; i++) {
        if (newTabFavoris[i]._id === comics._id) {
          //9 Si l'id est deja présent, alors je passe ma variable à true
          isExistDeja = true;
          //10. Cela veut dire que je veux supprimer ce comics de mon cookie
          newTabFavoris.splice(i, 1);
          //11. J'insere mon nouveau tableau avec le comics supprimé dans le cookie
          Cookies.set("CookieFavorisComics", newTabFavoris);
        }
      }

      //12.Si l'id n'est pas deja présent
      if (isExistDeja === false) {
        //13. J'ajoute alors mon comics dans mon tableau
        newTabFavoris.push(comics);
        //14. Puis dans mon cookie
        Cookies.set("CookieFavorisComics", newTabFavoris);
      }
    }
  };

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
    <div className="container">
      <div className="top">
        <div className="search-wrapper">
          {/* missing results of search */}
          {comics.length === 0 ? setError("Aucun résultat") : setError("")}

          {/* SEARCHBAR */}
          <SearchBar
            setSearch={setSearch}
            search={search}
            placeHolder={placeHolder}
            error={error}
          />
        </div>
        {comics.length !== 0 && (
          <div className="pagination-wrapper">
            {/* PAGINATION */}
            <Pagination
              skip={skip}
              setSkip={setSkip}
              limit={limit}
              count={count}
            />
          </div>
        )}
      </div>

      <div className="Wrapper">
        {/* RESULTS */}
        {comics.map((elem, i) => {
          // Definition de la couleur de l'étoile favoris
          // 1. A chaque map, je mets la variable qui va définir si l'id du comics est présent dans le cookie à false
          favoris = false;
          // 2. Ensuite, jecherche dans le cookie si l'id de mon comics actuel est présent
          if (typeof Cookies.get("CookieFavorisComics") !== "undefined") {
            let cookie = JSON.parse(Cookies.get("CookieFavorisComics"));
            for (let y = 0; y < cookie.length; y++) {
              // 3.Si l'id du comics actuellement mappé est présent dans le cookie, je passe la variable a true
              if (cookie[y]._id === elem._id) {
                // 4.Si la variable passe à true, alors ma couleur d'étoile passe en valide
                favoris = true;
                console.log(favoris);
              }
            }
          }
          return (
            <div className="card" id={elem._id} key={i}>
              <div className="imgCard">
                <img
                  src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                  alt={elem.name}
                />
              </div>
              <div className="infoCard">
                <span>{elem.title}</span>
                {elem.description ? (
                  <p className="description">
                    {elem.description.slice(0, 50) + "..."}
                  </p>
                ) : (
                  <p className="missingDescription">Aucune description</p>
                )}
                {/* FAVORITE */}
                {/* Je test ici la varibale favoris de mon comics mappé actuellement, ce qui va définir sa couleur */}
                <div
                  className="favoriteStar"
                  onClick={() => handleFavorite(elem)}
                >
                  {favoris ? (
                    <img src={starFavoris} alt="" />
                  ) : (
                    <img src={starFavorisBlanc} alt="" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="container isLoading">
      <img className="tourne" src={loading} alt="" />
      <span>En attente</span>
    </div>
  );
};

export default Comics;
