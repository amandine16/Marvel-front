import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const Comics = ({ error, setError }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState([]);
  const [search, setSearch] = useState("");

  // PAGINATION
  const [skip, setSkip] = useState(0);
  let limit = 100;
  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-react.herokuapp.com/comics/?skip=${skip}&limit=${limit}&title=${search}`
        );
        setComics(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComics();
  }, [skip, limit, search]);
  return !isLoading ? (
    <div className="Comics container">
      {/* SEARCHBAR */}
      <SearchBar setSearch={setSearch} search={search} />
      {/* PAGINATION */}
      <Pagination
        skip={skip}
        setSkip={setSkip}
        limit={limit}
        count={comics.count}
      />
      {/* MISSING RESULTS */}
      {comics.length === 0 ? setError("Aucun résultat") : setError("")}
      {error && <span>{error}</span>}
      {/* RESULTS */}
      {comics.results.map((elem, i) => {
        return (
          <div className="cardComics" id={elem._id} key={i}>
            <div className="imgComics">
              <img
                src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                alt=""
              />
            </div>
            <div className="infoComics">
              <span>{elem.title}</span>
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

export default Comics;
