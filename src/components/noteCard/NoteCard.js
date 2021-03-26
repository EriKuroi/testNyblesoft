import './noteCard.scss'
import uuid from 'react-uuid'
import { ReactComponent as DeleteLogo } from '../../assets/trash-alt-solid.svg';
import PropTypes from 'prop-types';

const NoteCard = ({ id, title, text, hashtags, handleCardClick }) => {
    const handleClick = (e) => {
        if (e.target.tagName.toLowerCase() === 'span') {
            handleCardClick('hash', e.target.innerText);
        } else if (e.target.classList.contains('delete-note')) {
            handleCardClick('del', id);
        } else {
            handleCardClick('card', id);
        }
    };
    return (
        <div
            className="note-card"
            onClick={handleClick}
        >
            <div className="headline">
                <div className="card-title" title={title}>
                    {title}
                </div>
                <button className="delete-note">
                    <DeleteLogo style={{ 'pointerEvents': 'none' }} />
                </button>
            </div>
            <p>{text}</p>
            <div className="note-card_tags-area">
                {!!hashtags.length && hashtags.map(elem => <span key={uuid()} title={`#${elem}`} >#{elem}</span>)}
            </div>
        </div>
    )
};

NoteCard.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    hashtags: PropTypes.arrayOf(PropTypes.string),
    handleCardClick: PropTypes.func
};
NoteCard.defaultProps = {
    id: '',
    title: 'No title',
    text: '',
    hashtags: [],
    handleCardClick: () => { console.error('Oops, cant find handleSearch function') }
};

export default NoteCard;
