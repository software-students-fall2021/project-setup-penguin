import { useState } from "react";
import React from "react";
import "./SearchBar.css";
import searchicon from "../../assets/searchicon.png";

function Search({ placeholder, data, filter}){
    //search word
    const [wordEntered, setWordEntered] = useState("");

    console.log("data", data);

    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = data.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
      });

      //If empty searchbar, then set filteredData to empty array
      if (searchWord === "") {
        filter(data);
      } else {
        //Otherwise, setFilteredData based off of newFilter return
        filter(newFilter);
      }
    };

    const clearInput = () => {
      filter(data);
      setWordEntered("");
    };

    return(
        <div className="search-gen">
            <div className="search-group">
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                    className="searchbar"
                />
                <img className="search-icon" src={searchicon} />
            </div>
            {/* <Button onClick={clearInput}></Button> */}
        </div>
    )
}

export default Search;