
import "./SearchBar.css"
import { FiSearch } from "react-icons/fi";

function SearchEventBar({ handleSearch }) {
    return (
        <form  method="GET" className="search-form">
        <div className="search-container">
          <input
          
            type="text"
            name="query"
            className="search-input"
            placeholder="Search Events"
            onChange={handleSearch}
          />
          <FiSearch className="search-icon" />
        </div>
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
    );
  }
            
export default SearchEventBar;