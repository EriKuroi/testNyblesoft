import './noteEditor.scss';
import { useState, useRef, useEffect } from 'react';
import uuid from 'react-uuid';

const NoteEditor = ({ handleSave, closeModal }) => {
    const textInput = useRef(null);
    const [currentNoteText, setCurrentNoteText] = useState('');
    const [currentHashtags, setCurrentHashtags] = useState([]);
    const [currentTitle, setCurrentTitle] = useState('No Title');

    useEffect(() => {
        textInput.current.focus();
    }, []);

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
        }else{ setCurrentHashtags([])};
    }
    const nandleScroll = (e) => {
        const scrollPos = e.target.scrollTop;
        e.target.parentNode.querySelector('.highlights').scrollTop = scrollPos;
    }
    
    
    const handleSaveClick = () => {
        const current = {};
        current.header = currentTitle;
        current.text = currentNoteText;
        current.hashtags = currentHashtags;
        current.id = `${uuid()}`;
        handleSave(current);
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
                    onChange={handleTitleInput}
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
                />
            </div>
            <div className="note-footer">
                <div className="note-hashtags">
                    {currentHashtags.length > 0 &&
                        currentHashtags.map(elem => <span key={uuid()}>#{elem}</span>)
                    }
                </div>
                <button id="save" className="saveButton" onClick={handleSaveClick}>Save</button>
            </div>
        </>
    )
};
export default NoteEditor;