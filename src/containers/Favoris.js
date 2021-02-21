import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import starFavoris from "../assets/img/starFavoris.jpg";
import starFavorisBlanc from "../assets/img/starFavorisBlanc.jpg";
import { useState } from "react";

const Favoris = ({
  setErrorComics,
  errorComics,
  errorCharacter,
  setErrorCharacter,
  setUrl,
}) => {
  // Je récupère l'url de la page
  setUrl(window.location.pathname);
  const history = useHistory();
  // Variable pour changer les favoris
  let favoris = false;
  let favorisComics = false;
  // Création du tableau a vide , qui va stocker le tableua de cookie
  let newTabFavoris;
  let newTabFavorisComics;
  // Je crée un state pour relancer ma page à chaque changement du cookie
  const [reloadFavoris, setReloadFavoris] = useState(false);

  Cookies.get("CookieFavorisCharacter")
    ? (newTabFavoris = JSON.parse(Cookies.get("CookieFavorisCharacter")))
    : (newTabFavoris = []);
  Cookies.get("CookieFavorisComics")
    ? (newTabFavorisComics = JSON.parse(Cookies.get("CookieFavorisComics")))
    : (newTabFavorisComics = []);

  //   FUNCTION FOR INFO COMICS
  const handleClickForComicsRelated = (id) => {
    history.push("/comics-related", { id: id });
  };

  // FUNCTION POUR AJOUT/SUPPRESION PERSO/COMICS EN FAVORIS
  const handleFavorite = (elem, from) => {
    let isExistDeja = false;
    // Clic pour ajouter/supprimer un perso en favoris
    if (from === "character") {
      // 1. Au premier clic,Je test si le cookie est plein
      if (newTabFavoris.length === 0) {
        // 2. S'il est vide, je push dans le tableau mon premier perso
        newTabFavoris.push(elem);
        //  3. J'ajoute ensuite ce tableau dans le cookie
        Cookies.set("CookieFavorisCharacter", newTabFavoris);
      } else {
        // 4.Si le cookie n'est pas vide
        // 5.Je cherche dans mon tableau d'objet si le perso est deja présent
        for (let i = 0; i < newTabFavoris.length; i++) {
          if (newTabFavoris[i]._id === elem._id) {
            //6. Si l'id est deja présent, alors je passe ma variable à true => DONC SUPPRESSION DU FAVORIS
            isExistDeja = true;
            //7. Cela veut dire que je veux supprimer ce perso de mon cookie
            newTabFavoris.splice(i, 1);
            //8. J'insere mon nouveau tableau avec le perso supprimé dans le cookie
            Cookies.set("CookieFavorisCharacter", newTabFavoris);
          }
        }
      } //9.Si l'id n'est pas deja présent => Donc AJOUT DU FAVORIS
      if (isExistDeja === false) {
        //10. J'ajoute alors mon perso dans mon tableau
        newTabFavoris.push(elem);
        //11. J'insere mon nouveau tableau avec le nouveau perso dans le cookie
        Cookies.set("CookieFavorisCharacter", newTabFavoris);
      }
    } else {
      // Clic pour ajouter/supprimer un Comics en favoris
      if (newTabFavorisComics.length === 0) {
        newTabFavorisComics.push(elem);
        Cookies.set("CookieFavorisComics", newTabFavorisComics);
      } else {
        for (let i = 0; i < newTabFavorisComics.length; i++) {
          if (newTabFavorisComics[i]._id === elem._id) {
            isExistDeja = true;
            newTabFavorisComics.splice(i, 1);
            Cookies.set("CookieFavorisComics", newTabFavorisComics);
          }
        }
      }
      if (isExistDeja === false) {
        newTabFavorisComics.push(elem);
        Cookies.set("CookieFavorisComics", newTabFavorisComics);
      }
    }
    // A chaque clic, je relance ma page, pour mettre à jour l'affichage des favoris
    reloadFavoris ? setReloadFavoris(false) : setReloadFavoris(true);
  };

  // AFFICHAGE DES PERSOS ET COMICS FAVORIS
  return (
    <>
      <div className="Favoris container">
        {/* Si pas de perso favoris dans le cookie */}
        {!Cookies.get("CookieFavorisCharacter") ||
        Cookies.get("CookieFavorisCharacter") === "[]" ? (
          <>
            {setErrorCharacter("Aucun résultat perso")}
            <span className="error">{errorCharacter}</span>
          </>
        ) : (
          <>
            {/* Si il y a des Perso favoris dans le cookie */}
            {setErrorCharacter("")}
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
                <div className="card" id={elem._id} key={i}>
                  <div className="imgCard">
                    <img
                      src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                      alt={elem.name}
                      onClick={() => handleClickForComicsRelated(elem._id)}
                    />
                  </div>
                  <div className="infoCard">
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
                      className="favoriteStar"
                      onClick={() => handleFavorite(elem, "character")}
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
          </>
        )}
        {/* COMIC FAVORIS */}
        {/* Si pas de comics favoris dans le cookie */}
        {!Cookies.get("CookieFavorisComics") ||
        Cookies.get("CookieFavorisComics") === "[]" ? (
          <>
            {setErrorComics("Aucun résultat comics")}
            <span className="error">{errorComics}</span>
          </>
        ) : (
          <>
            {/* Si il y a des comics favoris dans le cookie */}
            {setErrorComics("")}
            {/* RESULTS */}
            {/* je mappe sur le newtabFavorisComics qui contient le cookie parsé (donc un tableau)*/}
            {newTabFavorisComics.map((elem, i) => {
              // DEFINITION DE LA COULEUR DE L'ETOILE
              // 1. A chaque map, je mets la variable qui va définir si l'id du comics est présent dans le cookie à false
              favorisComics = false;
              // 2. Ensuite, je cherche dans le cookie si l'id de mon comics actuel est présent
              for (let y = 0; y < newTabFavorisComics.length; y++) {
                // 3.Si l'id du comics actuellement mappé est présent dans le cookie, je passe la variable a true
                if (newTabFavorisComics[y]._id === elem._id) {
                  // 4.Si la variable passe à true, alors ma couleur d'étoile passe en valide
                  favorisComics = true;
                }
              }
              // AFFICHAGE DES CARD COMICS
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
                    <div
                      className="favoriteStar"
                      onClick={() => handleFavorite(elem, "comics")}
                    >
                      {favorisComics ? (
                        <img src={starFavoris} alt="" />
                      ) : (
                        <img src={starFavorisBlanc} alt="" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
    </>
  );
};
export default Favoris;
