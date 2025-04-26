import LogoutButton from "../logoutbutton/LogoutButton";
import Navbar from "../navbar/Navbar";
import SearchBar from "../searchbar/SearchBar";
import "./HomeCss.css"

function Home(){
    return (
        <div className="home-container">
            <div className="top-bar">
                <div className="left">
                    <LogoutButton/>
                </div>
                <div className="center">
                    <Navbar/>
                </div>
                <div className="right">
                    <SearchBar/>
                </div> {/*hay que acomodar bien esto*/}
            </div> {/* en topbar dejamos esto y toddo lo demas creamos un div abajo de este*/}
        </div>
    )
}

export default Home;