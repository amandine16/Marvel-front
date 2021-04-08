import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ComicsRelated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState("");
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    const fetchComicsRelated = async () => {
      try {
        const response = await axios.get(
          `https://marvel-backend-react.herokuapp.com/comics/${id}`
        );
        if (response) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchComicsRelated();
  }, [id]);

  return !isLoading ? (
    <div className="ComicsRelated container">
      {/* CHARACTER */}
      <section className="characterRelated">
        <div className="imgCharacterRelated">
          <img
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt=""
          />
        </div>
        <div className="infoCharacterRelated">
          <h2>{data.name}</h2>
          {data.description ? (
            <p className="description">
              {data.description.slice(0, 50) + "..."}
            </p>
          ) : (
            <p className="missingDescription">Aucune description</p>
          )}
        </div>
      </section>
      {/* COMICS */}
      <section className="comicsRelatedSection">
        {data.comics.length !== 0 ? (
          data.comics.map((elem, i) => {
            return (
              <div className="boxComic" id={elem._id}>
                <img
                  src={`${elem.thumbnail.path}.${elem.thumbnail.extension}`}
                  alt={elem.title}
                />
                <div className="infosComisRelated">
                  <span>{elem.title}</span>
                  {elem.description ? (
                    <p className="description">
                      {elem.description.slice(0, 250) + "..."}
                    </p>
                  ) : (
                    <p className="missingDescription">Aucune description</p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <span>nada associé</span>
        )}
      </section>

      {/* CHARACTER */}
      <section className="characterRelated">
        <div className="infoCharacterRelated">
          <h2>{data.name}</h2>
          {data.description ? (
            <p className="description">
              {data.description.slice(0, 50) + "..."}
            </p>
          ) : (
            <p className="missingDescription">Aucune description</p>
          )}
        </div>
        <div className="imgCharacterRelated">
          <img
            src={`${data.thumbnail.path}.${data.thumbnail.extension}`}
            alt=""
          />
        </div>
      </section>
    </div>
  ) : (
    <span>En attente ...</span>
  );
};

export default ComicsRelated;
