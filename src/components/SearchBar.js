const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="SearchBar">
      <input
        type="text"
        value={search}
        placeholder={`À la recherche d'un `}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
