import React from "react";
import "./SearchBar.css";
import searchicon from "../../assets/searchicon.png";

function Search({ placeholder, data, filterText, setFilterText }) {
  return (
    <div className="search-gen">
      <div className="search-group">
        <input
          type="text"
          placeholder={placeholder}
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="searchbar"
        />
        <img className="search-icon" src={searchicon} />
      </div>
      {/* <Button onClick={clearInput}></Button> */}
    </div>
  );
}

export default Search;
