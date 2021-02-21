import logoError from "../assets/img/errorSearchNoir.jpg";

const SearchBar = ({ search, setSearch, placeHolder, error }) => {
  return (
    <div className="SearchBar">
      <input
        type="text"
        value={search}
        placeholder={`À la recherche d'un ${placeHolder} ?`}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      {error && (
        <>
          <img src={logoError} className="tourne" alt="" />
          <span className="error">{error}</span>
        </>
      )}
    </div>
  );
};

export default SearchBar;
