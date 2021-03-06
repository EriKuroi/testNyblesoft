import './App.scss';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import Header from './components/header/Header';
import NoteCard from './components/noteCard/NoteCard';
import ClarifyFile from './components/clarifyFile/ClarifyFile';
import NoteEditor from './components/noteEditor/NoteEditor';

Modal.setAppElement('#root');

function App() {

  const [notes, setNotes] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loadModalIsOpen, setLoadModalIsOpen] = useState(false);
  const [nowInEdit, setNowInEdit] = useState(null);
  const [searchResults, setSearchresults] = useState(null);

  function openModal() {
    setIsOpen(true);
  }
  const openLoadModal = () => {
    setLoadModalIsOpen(true);
  };
  function closeModal() {
    setIsOpen(false);
    setLoadModalIsOpen(false);
    setNowInEdit(null);
  }

  const handleSearch = (searchText) => {
    const searchResultsArray = notes.reduce((acc, note) => {
      if (note.hashtags.find(hashtag => hashtag === searchText)) {
        acc.push(note);
      }
      return acc
    }, []);
    searchText ? setSearchresults(searchResultsArray) : setSearchresults(null);
  };
  const handleNoSearchClick = () => {
    setSearchresults(null);
  };
   
  const addNote = () => {
    openModal()
  };
  const findCardIndex = (id) => notes.findIndex(elem => elem.id === id);
  const deleteCard = (id) => {
    let confirmed = window.confirm('Are you sure you want to delete this note? \n This action\'s result will be saved into new file');
    if (confirmed) {
      const newNotes = notes.map(el => el);
      const index = findCardIndex(id)
      newNotes.splice(index, 1);
      setNotes(newNotes);
      saveToFile(JSON.stringify(newNotes));
    }
  };
  const editCard = (id) => {
    const index = findCardIndex(id);
    setNowInEdit(notes[index]);
    openModal()
  };
  const handleHashtagClick = (hashtag) => {
    handleSearch(hashtag.substring(1));
  };
  const handleCardClick = (type, data) => {
    switch (type) {
      case 'del':
        deleteCard(data);
        break;
      case 'hash':
        handleHashtagClick(data);
        break;
      case 'card':
        editCard(data);
        break;
      default:
        throw console.error(`card Click Error`, type, data);
    }
  };
  
  const loadFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setNotes(JSON.parse(e.target.result));
      }
      reader.readAsText(event.target.files[0]);
      setLoadModalIsOpen(false);
    }
  }; 
  const saveToFile = (dataString) => {
    const blob = new Blob([dataString], { type: "application/json" });
    saveAs(blob, "notes.json");
  };
  const handleSave = (type, current, old) => {
    const newNotes = notes.map(elem => elem)
    if (type === 'new') {
      newNotes.push(current);
    } else if (type === 'old') {
      const index = findCardIndex(old.id);
      newNotes[index] = current
    } else {
      throw console.error('cant save', type, current);
    }
    setNotes(newNotes);
    const notesString = JSON.stringify(newNotes);
    saveToFile(notesString);
  };

  const constructCards = (array) => {
    return array.map(elem => <NoteCard
      key={elem.id}
      title={elem.title}
      text={elem.text}
      hashtags={elem.hashtags}
      id={elem.id}
      handleCardClick={handleCardClick}
    />);
  };
  return (
    <>
      <Header handleSearch={handleSearch}></Header>
      <main>
        <button 
        className="addButton" onClick={addNote}>+</button>
        {!searchResults && !!notes.length && constructCards(notes)}
        {searchResults && !!searchResults.length && constructCards(searchResults)}
        {searchResults && !searchResults.length &&
          <article className="no-results-frame">
            <h1>No search results</h1>
            <button onClick={handleNoSearchClick}>Return to all notes</button>
          </article>
        }
        <button 
        className="loadButton" 
        onClick={openLoadModal}
        data-tip="Load your notes from local file"
        >
          Load
        </button>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Edit note"
          className="note-modal"
          overlayClassName="note-overlay"
        >
          <NoteEditor
            handleSave={handleSave}
            closeModal={closeModal}
            currentEdited={nowInEdit}
            modalIsOpen={modalIsOpen}
          ></NoteEditor>
        </Modal>
        <Modal
          isOpen={loadModalIsOpen}
          onRequestClose={closeModal}
          contentLabel="File load"
          className="Modal"
          overlayClassName="Overlay"
        >
          <ClarifyFile
            loadFile={loadFile}
            closeModal={closeModal}
          ></ClarifyFile>
        </Modal>
        <ReactTooltip />
      </main>
    </>
  );
}

export default App;
