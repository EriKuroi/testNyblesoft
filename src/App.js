import './App.scss';
import { useState, useEffect } from 'react';
import Header from './components/header/Header';
import NoteCard from './components/noteCard/NoteCard';
import ClarifyFile from './components/clarifyFile/ClarifyFile';
// import notesFile from 'C:/Users/Eri Kurayami/notes.json'
import uuid from 'react-uuid';
function App() {
  const [notes, setNotes] = useState([]);
  const [notesLoaded, setNotesLoaded] = useState(false);

  // useEffect(() => {

  // }, []);
  const handleCardClick = () => {
    console.log('CLICK')
  };
  const handleSearch = () => {
    console.log('search')
  };
  const handleFileButtonsClick = (e) => {
    console.log(e.target.id)
  };
  return (
    <>
      <Header handleClick={handleSearch}></Header>
      <main>
        {!notesLoaded && <>
          <ClarifyFile handleClick={handleFileButtonsClick}/>
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
