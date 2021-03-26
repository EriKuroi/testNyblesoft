import './searchForm.scss'
import { ReactComponent as SearchLogo } from '../../assets/search.svg';
import ReactTooltip from 'react-tooltip';
const SearchForm = ({handleSearch}) => {
    const handleSubmit = () =>{

    };
    return (
    <form 
    className="search-form"
    data-tip="Search notes by hashtag" 
    data-place="bottom" 
    onSubmit={handleSubmit}>
        <input type="text" id="search-input" name="search-input" />
        <button className="search-button" onClick={handleSearch}>
            <SearchLogo />
        </button>
        <ReactTooltip />
    </form>
    );
};
export default SearchForm