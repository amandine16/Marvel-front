import { useState } from "react";

const Pagination = ({ skip, setSkip, limit, count }) => {
  let nbPageTotal = Math.ceil(count / limit);
  let tabPage = [];
  const [pageActuelle, setPageActuelle] = useState(1);
  for (let i = 1; i <= nbPageTotal; i++) {
    tabPage.push(i);
  }
  const [pageMin, setPageMin] = useState(0);
  const [pageMax, setPageMax] = useState(8);

  const handlePrecedent = () => {
    setPageActuelle(pageActuelle - 1);
    setSkip(skip - 100);
    setPageMin(pageMin - 1);
  };
  const handleSuivant = () => {
    setSkip(skip + 100);
    setPageActuelle(pageActuelle + 1);
    setPageMin(pageMin + 1);
    console.log(tabPage.length);
    if (pageMin >= nbPageTotal - 8) {
      setPageMin(7);
    }
  };

  return (
    <div className="pagination">
      {pageActuelle > 1 && (
        <div className="previous" onClick={handlePrecedent}>
          -
        </div>
      )}

      <ul>
        {/* Numéro des pages disponibles */}
        {tabPage.splice(pageMin, pageMax).map((numeroDePage, i) => {
          return (
            <li
              key={i}
              style={{
                color: numeroDePage === pageActuelle && "white",
                backgroundColor: numeroDePage === pageActuelle && "#d8141c",
              }}
              onClick={() => {
                let newSkip = numeroDePage * 100 - 100;
                setPageActuelle(numeroDePage);
                setSkip(newSkip);
              }}
            >
              {numeroDePage}
            </li>
          );
        })}
      </ul>

      {pageActuelle !== nbPageTotal && (
        <div className="next" onClick={handleSuivant}>
          +
        </div>
      )}
    </div>
  );
};

export default Pagination;
