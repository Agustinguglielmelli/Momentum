import "./SearchBarCss.css"
function SearchBar({ handleSearch }) {
    return (
        <form method="GET" className="search-form">
            <input type="text" name="query" placeholder="Search users" className="search-input" onChange={handleSearch} />
        </form>
    )
}

export default SearchBar;