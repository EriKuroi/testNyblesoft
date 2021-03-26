import './noteCard.scss'
import uuid from 'react-uuid'
import { ReactComponent as DeleteLogo } from '../../assets/trash-alt-solid.svg';

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

export default NoteCard;
