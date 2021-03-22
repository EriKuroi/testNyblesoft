import './header.scss'
import { ReactComponent as SearchLogo } from '../../assets/search.svg';
import ReactTooltip from 'react-tooltip';

const Header = ({ handleClick }) => {
    return (
        <header>
            <div>
                <h1>W.E.I.R.D.</h1>
                <p>Write, Edit, Indicate, Read, Delete</p>
            </div>
            <section data-tip="Search notes by hashtag" data-place="bottom">
                <input type="text" id="search-input" />
                <button className="search-button" onClick={handleClick}>
                    <SearchLogo />
                </button>
                <ReactTooltip />
            </section>
        </header>
    )
};

export default Header;