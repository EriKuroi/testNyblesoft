import './searchForm.scss'
import { useState } from 'react';
import { ReactComponent as SearchLogo } from '../../assets/search.svg';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

const SearchForm = ({ handleSearch }) => {
    const [searchText, setSearchText] = useState('');
    const handleSearchInput = (e) => {
        setSearchText(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch(searchText);
    };
    return (
        <form
            className="search-form"
            data-tip="Search notes by hashtag"
            data-place="bottom"
            onSubmit={handleSubmit}>
            <input
                type="text"
                id="search-input"
                name="search-input"
                value={searchText}
                onInput={handleSearchInput}
            />
            <button className="search-button">
                <SearchLogo />
            </button>
            <ReactTooltip />
        </form>
    );
};

SearchForm.propTypes = {
    handleSearch: PropTypes.func,
};
SearchForm.defaultProps = {
    handleSearch: ()=>{console.error('Oops, cant find handleSearch function')}
};

export default SearchForm