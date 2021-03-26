import './header.scss';
import SearchForm from '../searchForm/SearchForm';
import PropTypes from 'prop-types';

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

Header.propTypes = {
    handleSearch: PropTypes.func,
};
Header.defaultProps = {
    handleSearch: ()=>{console.error('Oops, cant find handleSearch function')}
};

export default Header;