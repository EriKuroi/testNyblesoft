import './App.scss';
import Header from './components/header/Header'
import NoteCard from './components/noteCard/NoteCard'
import notes from './notes.json'
import uuid from 'react-uuid'

const hashtags = ['hop', 'pop']
const title = 'Card for note'
const text = 'Lorem ipsum dolor set amet'
const handleClick = () => {
  console.log('CLICK')
}
const handleSearch = () => {
  console.log('find');
};

function App() {
  console.log(notes)
  return (
    <>
      <Header handleSearch={handleSearch}></Header>
      <main>
        <button className="addButton">+</button>
        {notes.map(elem => <NoteCard
          key={uuid()}
          title={elem.header}
          text={elem.text}
          hashtags={elem.hashtags}
          handleClick={handleClick}
        />)}
        <NoteCard
          title={title}
          text={text}
          hashtags={hashtags}
          handleClick={handleClick}
        ></NoteCard>
      </main>
    </>
  );
}

export default App;
