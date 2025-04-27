import "./SearchBar.css"
function SearchUserBar({ handleSearch }) {
    return (
        <form className="search-form">
           <div className="search-container">
            <input
                type="text"
                className="search-input"
                placeholder="Search Users"
            />
            <FiSearch className="search-icon" />
            </div>
            <button type="submit" className="search-button">
            Search
            </button>
        </form>
    );
}

export default SearchUserBar;