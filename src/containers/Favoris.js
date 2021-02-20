import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import starFavoris from "../assets/img/starFavorite.jpg";
import { useState } from "react";

const Favoris = ({ setError, error }) => {
  const history = useHistory();
  // Variable pour changer les favoris
  let favoris = false;
  // Création du tableau a vide , qui va stocker le tableua de cookie
  let newTabFavoris;
  // Je crée un state pour relancer ma page à chaque changement du cookie
  const [cookieCharacterFavoris, setCookieCharacterFavoris] = useState(
    Cookies.get("CookieFavorisCharacter") || null
  );
  if (cookieCharacterFavoris !== null) {
    // Si le cookie est rempli, je le copie
    newTabFavoris = JSON.parse(Cookies.get("CookieFavorisCharacter"));
  } else {
    newTabFavoris = [];
  }
  console.log(newTabFavoris);

  //   FUNCTION FOR INFO COMICS
  const handleClickForComicsRelated = (id) => {
    history.push("/comics-related", { id: id });
  };

  const handleFavorite = (character) => {
    let isExistDeja = false;
    // 1. Au premier clic,Je test si un cookie existe
    if (newTabFavoris === []) {
      // 2. je push dans le tableau mon premier perso
      newTabFavoris.push(character);
      //  3. J'ajoute ensuite ce tableau dans le cookie
      Cookies.set("CookieFavorisCharacter", newTabFavoris);
      // je mets à jour mon state
      setCookieCharacterFavoris(newTabFavoris);
      // 4. Le premier tour est fini
    } else {
      // 5.Si le cookie n'est pas vide
      // 7.Je cherche dans mon tableau d'objet si le perso est deja présent
      for (let i = 0; i < newTabFavoris.length; i++) {
        if (newTabFavoris[i]._id === character._id) {
          //9 Si l'id est deja présent, alors je passe ma variable à true
          isExistDeja = true;
          //10. Cela veut dire que je veux supprimer ce perso de mon cookie
          newTabFavoris.splice(i, 1);
          //11. J'insere mon nouveau tableau avec le perso supprimé dans le cookie
          Cookies.set("CookieFavorisCharacter", newTabFavoris);
          setCookieCharacterFavoris(newTabFavoris);
        }
      }

      //12.Si l'id n'est pas deja présent
      if (isExistDeja === false) {
        //13. J'ajoute alors mon perso dans mon tableau
        newTabFavoris.push(character);
        //14. Puis dans mon cookie
        Cookies.set("CookieFavorisCharacter", newTabFavoris);
        setCookieCharacterFavoris(newTabFavoris);
      }
    }
  };

  return (
    <>
      <div className="Favoris">
        {/* Si pas de perso favoris dans le cookie */}
        {cookieCharacterFavoris === null ? (
          <>
            {setError("Aucun résultat")}
            <span>{error}</span>
          </>
        ) : (
          <>
            {/* Si il y a des Perso favoris dans le cookie */}
            {setError("")}
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
                          onClick={() => handleFavorite(elem)}
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
        ;
      </div>
    </>
  );
};

export default Favoris;
