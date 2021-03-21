import './noteCard.scss'
import uuid from 'react-uuid'
import { ReactComponent as DeleteLogo } from '../../assets/trash-alt-solid.svg';
import { ReactComponent as EditLogo } from '../../assets/edit-solid.svg';

const NoteCard = ({ title, text, hashtags, handleClick }) => {
    return (
        <div
            className="note-card"
            onClick={handleClick}
        >
            <div className="headline">
                <button className="edit-note">
                    <EditLogo />
                </button>
                {title}
                <button className="delete-note">
                    <DeleteLogo />
                </button>
            </div>
            <p>{text}</p>
            <div className="note-card_tags-area">
                {hashtags.map(elem => <span key={uuid()} >#{elem}</span>)}
            </div>
        </div>
    )
};

export default NoteCard;
