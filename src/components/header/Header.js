import './header.scss'
import { ReactComponent as SearchLogo } from '../../assets/search.svg';

const Header = ({ handleSearch }) => {
    return (
        <header>
            <div>
                <h1>W.E.I.R.D.</h1>
                <p>Write, Edit, Indicate, Read, Delete</p>
            </div>
            <form>
                <input type="text" id="search-input" className="inactivated" />
                <button className="search-button" onClick={handleSearch}>
                    <SearchLogo />
                </button>
            </form>
        </header>
    )
};

export default Header;