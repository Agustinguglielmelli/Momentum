import "./SearchBar.css"
import { FiSearch } from "react-icons/fi";
function SearchUserBar({ handleSearch }) {
    return (
        <form  method="GET" className="search-form">
        <div className="search-container">
          <input
            type="text"
            name="query"
            className="search-input"
            placeholder="Search Users"
            onChange={handleSearch}
          />
          <FiSearch className="search-icon" />
        </div>
      </form>
    );
  }

export default SearchUserBar;

    