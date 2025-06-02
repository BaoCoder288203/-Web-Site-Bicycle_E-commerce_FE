import React from "react";
import { FaSearch } from "react-icons/fa";
import "./searchBar.css";
import { Link } from "react-router-dom";

const SearchBar: React.FC = () => {
  return (
    <div className="search-box">
      <input type="text" placeholder="Search Bikes, Gear & Accessories" />
      <Link to="/search">
        <FaSearch className="search-icon" />
      </Link>
    </div>
  );
};

export default SearchBar;
