import { useState, useEffect } from "react";
import axios from "axios";

const Comics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [comics, setComics] = useState([]);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get("http://localhost:3000/comics");
        setComics(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComics();
  }, []);
  return !isLoading ? (
    <div className="Comics container">
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
