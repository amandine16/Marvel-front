import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import starFavoris from "../assets/img/starFavorite.jpg";
import { useState } from "react";

const Favoris = ({
  setErrorComics,
  errorComics,
  errorCharacter,
  setErrorCharacter,
}) => {
  const history = useHistory();
  // Variable pour changer les favoris
  let favoris = false;
  let favorisComics = false;
  // Création du tableau a vide , qui va stocker le tableua de cookie
  let newTabFavoris;
  let newTabFavorisComics;
  // Je crée un state pour relancer ma page à chaque changement du cookie
  const [reloadFavoris, setReloadFavoris] = useState(false);

  if (Cookies.get("CookieFavorisCharacter")) {
    // Si le cookie existe, je le copie
    newTabFavoris = JSON.parse(Cookies.get("CookieFavorisCharacter"));
  } else {
    newTabFavoris = [];
  }
  console.log("cookie perso - P-favoris");
  console.log(newTabFavoris);

  if (Cookies.get("CookieFavorisComics")) {
    // Si le cookie existe, je le copie
    newTabFavorisComics = JSON.parse(Cookies.get("CookieFavorisComics"));
  } else {
    newTabFavorisComics = [];
  }
  console.log("cookie comics - P-favoris");
  console.log(newTabFavorisComics);

  //   FUNCTION FOR INFO COMICS
  const handleClickForComicsRelated = (id) => {
    history.push("/comics-related", { id: id });
  };

  const handleFavorite = (elem, from) => {
    let isExistDeja = false;
    if (from === "character") {
      // 1. Au premier clic,Je test si un cookie existe
      if (newTabFavoris.length === 0) {
        // 2. je push dans le tableau mon premier perso
        newTabFavoris.push(elem);
        //  3. J'ajoute ensuite ce tableau dans le cookie
        Cookies.set("CookieFavorisCharacter", newTabFavoris);
      } else {
        // 5.Si le cookie n'est pas vide
        // 7.Je cherche dans mon tableau d'objet si le perso est deja présent
        for (let i = 0; i < newTabFavoris.length; i++) {
          if (newTabFavoris[i]._id === elem._id) {
            //9 Si l'id est deja présent, alors je passe ma variable à true
            isExistDeja = true;
            //10. Cela veut dire que je veux supprimer ce perso de mon cookie
            newTabFavoris.splice(i, 1);

            //11. J'insere mon nouveau tableau avec le perso supprimé dans le cookie
            Cookies.set("CookieFavorisCharacter", newTabFavoris);
          }
        }
      } //12.Si l'id n'est pas deja présent
      if (isExistDeja === false) {
        //13. J'ajoute alors mon perso dans mon tableau
        newTabFavoris.push(elem);
        //14. Puis dans mon cookie

        //11. J'insere mon nouveau tableau avec le perso supprimé dans le cookie
        Cookies.set("CookieFavorisCharacter", newTabFavoris);
      }
    } else {
      // 1. Au premier clic,Je test si un cookie existe
      if (newTabFavorisComics.length === 0) {
        // 2. je push dans le tableau mon premier perso
        newTabFavorisComics.push(elem);
        //  3. J'ajoute ensuite ce tableau dans le cookie
        Cookies.set("CookieFavorisComics", newTabFavorisComics);
      } else {
        // 5.Si le cookie n'est pas vide
        // 7.Je cherche dans mon tableau d'objet si le perso est deja présent
        for (let i = 0; i < newTabFavorisComics.length; i++) {
          if (newTabFavorisComics[i]._id === elem._id) {
            //9 Si l'id est deja présent, alors je passe ma variable à true
            isExistDeja = true;
            //10. Cela veut dire que je veux supprimer ce perso de mon cookie
            newTabFavorisComics.splice(i, 1);

            //11. J'insere mon nouveau tableau avec le perso supprimé dans le cookie
            Cookies.set("CookieFavorisComics", newTabFavorisComics);
          }
        }
      } //12.Si l'id n'est pas deja présent
      if (isExistDeja === false) {
        //13. J'ajoute alors mon perso dans mon tableau
        newTabFavorisComics.push(elem);
        //14. Puis dans mon cookie

        //11. J'insere mon nouveau tableau avec le perso supprimé dans le cookie
        Cookies.set("CookieFavorisComics", newTabFavorisComics);
      }
    }
    reloadFavoris ? setReloadFavoris(false) : setReloadFavoris(true);
  };

  return (
    <>
      <div className="Favoris">
        {/* Si pas de perso favoris dans le cookie */}
        {!Cookies.get("CookieFavorisCharacter") ||
        Cookies.get("CookieFavorisCharacter") === "[]" ? (
          <>
            {setErrorCharacter("Aucun résultat perso")}
            <span>{errorCharacter}</span>
          </>
        ) : (
          <>
            {/* Si il y a des Perso favoris dans le cookie */}
            {setErrorCharacter("")}
            <div className="characterFavoris">
              <div className="Home container">
                {/* RESULTS */}
                {/* je mappe sur le newtabFavoris qui contient le cookie parsé (donc un tableau)*/}
                {newTabFavoris.map((elem, i) => {
                  // DEFINITION DE LA COULEUR DE L'ETOILE
                  // 1. A chaque map, je mets la variable qui va définir si l'id du perso est présent dans le cookie à false
                  favoris = false;
                  // 2. Ensuite, jecherche dans le cookie si l'id de mon perso actuel est présent
                  for (let y = 0; y < newTabFavoris.length; y++) {
                    // 3.Si l'id du perso actuellement mappé est présent dans le cookie, je passe la variable a true
                    if (newTabFavoris[y]._id === elem._id) {
                      // 4.Si la variable passe à true, alors ma couleur d'étoile passe en valide
                      favoris = true;
                    }
                  }
                  // AFFICHAGE DES CARD PERSO
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
                          <p className="missingDescription">
                            Aucune description
                          </p>
                        )}
                        {/* FAVORITE */}
                        <div
                          style={{
                            border:
                              favoris === true
                                ? "2px solid green"
                                : "2px solid red",
                          }}
                          className="favoriteStar"
                          onClick={() => handleFavorite(elem, "character")}
                        >
                          <img src={starFavoris} alt="" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
        {/* COMIC FAVORIS */}
        {/* Si pas de perso favoris dans le cookie */}
        {!Cookies.get("CookieFavorisComics") ||
        Cookies.get("CookieFavorisComics") === "[]" ? (
          <>
            {setErrorComics("Aucun résultat comics")}
            <span>{errorComics}</span>
          </>
        ) : (
          <>
            {/* Si il y a des Perso favoris dans le cookie */}
            {setErrorComics("")}
            <div className="characterFavoris">
              <div className="Home container">
                {/* RESULTS */}
                {/* je mappe sur le newtabFavoris qui contient le cookie parsé (donc un tableau)*/}
                {newTabFavorisComics.map((elem, i) => {
                  // DEFINITION DE LA COULEUR DE L'ETOILE
                  // 1. A chaque map, je mets la variable qui va définir si l'id du perso est présent dans le cookie à false
                  favorisComics = false;
                  // 2. Ensuite, jecherche dans le cookie si l'id de mon perso actuel est présent
                  for (let y = 0; y < newTabFavorisComics.length; y++) {
                    // 3.Si l'id du perso actuellement mappé est présent dans le cookie, je passe la variable a true
                    if (newTabFavorisComics[y]._id === elem._id) {
                      // 4.Si la variable passe à true, alors ma couleur d'étoile passe en valide
                      favorisComics = true;
                    }
                  }
                  // AFFICHAGE DES CARD PERSO
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
                          <p className="missingDescription">
                            Aucune description
                          </p>
                        )}
                        {/* FAVORITE */}
                        <div
                          style={{
                            border:
                              favorisComics === true
                                ? "2px solid green"
                                : "2px solid red",
                          }}
                          className="favoriteStar"
                          onClick={() => handleFavorite(elem, "comics")}
                        >
                          <img src={starFavoris} alt="" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Favoris;
