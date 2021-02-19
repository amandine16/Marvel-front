import { useState } from "react";

const Pagination = ({ setSkip, limit, count }) => {
  let nbPageTotal = Math.ceil(count / limit);
  let tabPage = [];
  const [pageActuelle, setPageActuelle] = useState(1);
  for (let i = 1; i <= nbPageTotal; i++) {
    tabPage.push(i);
  }
  return (
    <div className="pagination">
      <ul>
        {/* Numéro des pages disponibles */}
        {tabPage.map((numeroDePage, i) => {
          return (
            <li
              key={i}
              style={{
                color: numeroDePage === pageActuelle && "white",
                backgroundColor: numeroDePage === pageActuelle && "#29ADB6",
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
    </div>
  );
};

export default Pagination;
