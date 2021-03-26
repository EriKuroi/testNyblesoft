import './header.scss';
import SearchForm from '../searchForm/SearchForm';

const Header = ({ handleSearch }) => {
    return (
        <header>
            <div>
                <h1>W.E.I.R.D.</h1>
                <p>Write, Edit, Indicate, Read, Delete</p>
            </div>
            <SearchForm handleSearch={handleSearch} />
        </header>
    )
};

export default Header;