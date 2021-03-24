import './App.scss';
import { useState } from 'react';
import Header from './components/header/Header';
import NoteCard from './components/noteCard/NoteCard';
import ClarifyFile from './components/clarifyFile/ClarifyFile';
import Modal from 'react-modal';
import notesData from './notes.json';

import uuid from 'react-uuid';

Modal.setAppElement('#root')

function App() {

  const [notes, setNotes] = useState(notesData);
  const [notesLoaded, setNotesLoaded] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentNoteText, setCurrentNoteText] = useState('');
  const [currentHashtags, setCurrentHashtags] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('No title');

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
  const handleCardClick = () => {
    console.log('CLICK')
  };
  const handleSearch = () => {
    console.log('search')
  };
  const handleFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setNotes(JSON.parse(e.target.result));
        setNotesLoaded(true);
      }
      reader.readAsText(event.target.files[0]);
    }
  };
  const addNote = () => {
    openModal()
  };
  const applyHighlights = (text) => {
    const regexp = /#\w*/g;
    const debuggedText = text.replace(/\n$/g, `\n\n`);
    const noHashPartsArray = debuggedText.split(regexp);
    const highlightedTextArray = [];
    noHashPartsArray.forEach((element, index) => {
      highlightedTextArray.push(element);
      if (currentHashtags[index]) {
        highlightedTextArray.push(<mark>{currentHashtags[index]}</mark>);
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
      setCurrentHashtags(text.match(regexp));
    }
  }
  const nandleScroll = (e) => {
    const scrollPos = e.target.scrollTop;
    e.target.parentNode.querySelector('.highlights').scrollTop = scrollPos;
  }
  const handleSave = () => {
    const current = {};
    current.title = currentTitle;
    current.text = currentNoteText;
    current.hashtags = currentHashtags;
  };
  return (
    <>
      <Header handleClick={handleSearch}></Header>
      <main>
        {!notesLoaded && <>
          <ClarifyFile handleFile={handleFile} />
        </>}
        {notesLoaded && <>
          <button className="addButton" onClick={addNote}>+</button>
          {notes.length > 1 && notes.map(elem => <NoteCard
            key={uuid()}
            title={elem.header}
            text={elem.text}
            hashtags={elem.hashtags}
            handleClick={handleCardClick}
          />)}

        </>}
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Edit note"
          className="note-modal"
          overlayClassName="note-overlay"
        >
          <button className="close-modal" onClick={closeModal}>x</button>
          <div class="title-group">
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
              onInput={handleInputText}
              onScroll={nandleScroll}
            />
          </div>
          <div className="note-footer">
            <div className="note-hashtags">
              {currentHashtags.length > 0 &&
                currentHashtags.map(elem => <span key={uuid()}>{elem}</span>)
              }
            </div>
            <button className="saveButton" onClick={handleSave}>Save</button>
          </div>

        </Modal>
      </main>
    </>
  );
}

export default App;
