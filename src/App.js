import './App.scss';
import { useState } from 'react';
import Header from './components/header/Header';
import NoteCard from './components/noteCard/NoteCard';
import ClarifyFile from './components/clarifyFile/ClarifyFile';
import uuid from 'react-uuid';

function App() {
  const [notes, setNotes] = useState([]);
  const [notesLoaded, setNotesLoaded] = useState(false);
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
  return (
    <>
      <Header handleClick={handleSearch}></Header>
      <main>
        {!notesLoaded && <>
          <ClarifyFile handleFile={handleFile} />
        </>}
        {notesLoaded && <>
          <button className="addButton">+</button>
          {notes.length > 1 && notes.map(elem => <NoteCard
            key={uuid()}
            title={elem.header}
            text={elem.text}
            hashtags={elem.hashtags}
            handleClick={handleCardClick}
          />)}

        </>}
      </main>
    </>
  );
}

export default App;
