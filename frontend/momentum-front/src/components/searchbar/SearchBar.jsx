import "./SearchBarCss.css"
function SearchBar() {
    return (
        <form action="/buscar" method="GET" className="search-form">
            <input type="text" name="query" placeholder="Buscar..." className="search-input"/>
            <button type="submit" className="search-button">Search</button>
        </form>
    )
}

export default SearchBar;