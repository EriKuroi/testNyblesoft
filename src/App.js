import './App.scss';
import { useState } from 'react';
import { saveAs } from 'file-saver';
import Modal from 'react-modal';

import Header from './components/header/Header';
import NoteCard from './components/noteCard/NoteCard';
import ClarifyFile from './components/clarifyFile/ClarifyFile';
import NoteEditor from './components/noteEditor/NoteEditor';

Modal.setAppElement('#root')

function App() {

  const [notes, setNotes] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loadModalIsOpen, setLoadModalIsOpen] = useState(false);
  
  function openModal() {
    setIsOpen(true);
  }
  const openLoadModal = () => {
    setLoadModalIsOpen(true);
  };
  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
    setLoadModalIsOpen(false);   
  }
  const handleCardClick = (e) => {
    console.log(e.target)
  };

  const handleSearch = () => {
    console.log('search')
  };
  const handleFile = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setNotes(JSON.parse(e.target.result));
      }
      reader.readAsText(event.target.files[0]);
      setLoadModalIsOpen(false);
    }
  };
  const addNote = () => {
    openModal()
  };
  const saveToFile = (dataString) => {
    const blob = new Blob([dataString], { type: "application/json" });
    saveAs(blob, "notes.json");
  };
  const handleSave = (current) => {
    const newNotes = [...notes, current];
    setNotes(newNotes);
    const notesString = JSON.stringify(newNotes);
    saveToFile(notesString);    
  };
  return (
    <>
      <Header handleClick={handleSearch}></Header>
      <main>
        <button className="addButton" onClick={addNote}>+</button>
        {!!notes.length && notes.map(elem => <NoteCard
          key={elem.id}
          title={elem.header}
          text={elem.text}
          hashtags={elem.hashtags}
          id={elem.id}
          handleClick={handleCardClick}
        />)
        }
        <button className="loadButton" onClick={openLoadModal}>Load</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          contentLabel="Edit note"
          className="note-modal"
          overlayClassName="note-overlay"
        >
          <NoteEditor
            handleSave={handleSave}
            closeModal={closeModal}
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
            handleFile={handleFile}
            closeModal={closeModal}
          ></ClarifyFile>
        </Modal>
      </main>
    </>
  );
}

export default App;
