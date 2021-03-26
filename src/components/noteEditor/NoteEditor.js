import './noteEditor.scss';
import { useState, useRef, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';

const NoteEditor = ({ handleSave, closeModal, currentEdited }) => {
    const textInput = useRef(null);
    const [currentNoteText, setCurrentNoteText] = useState('');
    const [currentHashtags, setCurrentHashtags] = useState([]);
    const [currentTitle, setCurrentTitle] = useState('No Title');

    const applyCurrentNote = (note) => {
        setCurrentTitle(note.title);
        setCurrentNoteText(note.text);
        setCurrentHashtags(note.hashtags);
    }

    useEffect(() => {
        textInput.current.focus();
        if (currentEdited) {
            applyCurrentNote(currentEdited);
        }
    }, [currentEdited]);

    const applyHighlights = (text) => {
        const regexp = /#\w*/g;
        const debuggedText = text.replace(/\n$/g, `\n\n`);
        const noHashPartsArray = debuggedText.split(regexp);
        const highlightedTextArray = [];
        noHashPartsArray.forEach((element, index) => {
            highlightedTextArray.push(element);
            if (currentHashtags[index]) {
                highlightedTextArray.push(<mark key={uuid()}>#{currentHashtags[index]}</mark>);
            };
        });
        return highlightedTextArray;
    };
    const handleTitleInput = (e) => {
        setCurrentTitle(e.target.value);
    };
    const handleInputText = (e) => {
        const text = e.target.value;
        setCurrentNoteText(text);
        const regexp = /#\w*/g;
        if (text.match(regexp)) {
            setCurrentHashtags(text.match(regexp).map(el => el.slice(1)));
        } else { setCurrentHashtags([]) };
    };
    const nandleScroll = (e) => {
        const scrollPos = e.target.scrollTop;
        e.target.parentNode.querySelector('.highlights').scrollTop = scrollPos;
    };
    const handleSaveClick = () => {
        const current = {};
        current.title = currentTitle;
        current.text = currentNoteText;
        current.hashtags = currentHashtags;
        current.id = `${uuid()}`;
        let type;
        currentEdited ? type = 'old' : type = 'new';
        handleSave(type, current, currentEdited);
        closeModal()
    };
    return (
        <>
            <button className="close-modal" onClick={closeModal}>x</button>
            <div className="title-group">
                <label htmlFor="tile">Title:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={currentTitle}
                    onInput={handleTitleInput}
                />
            </div>
            <div className="container">
                <div className="backdrop" >
                    <div className="highlights">
                        {applyHighlights(currentNoteText)}
                    </div>
                </div>
                <textarea
                    name="text"
                    id="text"
                    ref={textInput}
                    onInput={handleInputText}
                    onScroll={nandleScroll}
                    value={currentNoteText}
                />
            </div>
            <div className="note-footer">
                <div className="note-hashtags">
                    {currentHashtags.length > 0 &&
                        currentHashtags.map(elem => <span key={uuid()}>#{elem}</span>)
                    }
                </div>
                <button
                    id="save"
                    className="saveButton"
                    onClick={handleSaveClick}
                    data-tip="Save to local file"
                >
                    Save
                </button>
                <ReactTooltip />
            </div>
        </>
    )
};

NoteEditor.propTypes = {
    handleSave: PropTypes.func, 
    closeModal: PropTypes.func, 
    currentEdited: PropTypes.shape({
        id: PropTypes.string, 
        title: PropTypes.string,
        text: PropTypes.string,
        hashtags: PropTypes.arrayOf(PropTypes.string)
    })
};
NoteEditor.defaultProps = {
    handleSave: () => { console.error('Oops, cant find handleSearch function') }, 
    closeModal: () => { console.error('Oops, cant find handleSearch function') }, 
    currentEdited: null
};

export default NoteEditor;