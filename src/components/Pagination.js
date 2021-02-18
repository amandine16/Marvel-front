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
                color: i + 1 === pageActuelle && "white",
                backgroundColor: i + 1 === pageActuelle && "#29ADB6",
              }}
              onClick={() => {
                let newSkip = i + 1;
                setPageActuelle(newSkip);
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
