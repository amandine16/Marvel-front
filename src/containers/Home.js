import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Pagination from "../components/Pagination";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const history = useHistory();
  //   FUNCTION FOR INFO COMICS
  const handleClickForComicsRelated = (id) => {
    history.push("/comics-related", { id: id });
  };
  // PAGINATION
  const [skip, setSkip] = useState(0);
  let limit = 100;

  // let nbPageTotal = Math.ceil(characters.count / limit);
  // let tabPage = [];
  // for (let i = 1; i <= nbPageTotal; i++) {
  //   tabPage.push(i);
  //   console.log(tabPage);
  // }

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-react.herokuapp.com/characters/?skip=${skip}&limit=${limit}`
        );
        setCharacters(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchCharacters();
  }, [skip, limit]);
  return !isLoading ? (
    <div className="Home container">
      <Pagination
        skip={skip}
        setSkip={setSkip}
        limit={limit}
        count={characters.count}
      />

      {characters.results.map((elem, i) => {
        return (
          <div
            className="cardCharacter"
            id={elem._id}
            key={i}
            onClick={() => handleClickForComicsRelated(elem._id)}
          >
            <div className="imgCharacter">
              <img
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                alt=""
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
