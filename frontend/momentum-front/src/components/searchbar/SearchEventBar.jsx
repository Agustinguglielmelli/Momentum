
import "./SearchBar.css"
import { FiSearch } from "react-icons/fi";

function SearchEventBar({ handleSearch }) {
    return (
            <form className="search-form">
              <div className="search-container">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search Events"
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