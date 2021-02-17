const Pagination = ({ setSkip, limit, count }) => {
  let nbPageTotal = Math.ceil(count / limit);
  let tabPage = [];
  for (let i = 1; i <= nbPageTotal; i++) {
    tabPage.push(i);
    console.log(tabPage);
  }
  return (
    <div className="pagination">
      <ul>
        {/* Numéro des pages disponibles */}
        {tabPage.map((numeroDePage, i) => {
          return (
            <li
              key={i}
              // style={{
              //   color: i + 1 === filters.page && "white",
              //   backgroundColor: i + 1 === filters.page && "#29ADB6",
              // }}
              onClick={() => {
                let newSkip = i + 1;
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
