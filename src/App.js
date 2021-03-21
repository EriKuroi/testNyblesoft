import './App.scss';
import Header from './components/header/Header'
import NoteCard from './components/noteCard/NoteCard'

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
  // console.log(notes)
  return (
    <>
      <Header handleSearch={handleSearch}></Header>
    <main>
        <button className="addButton">+</button>
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
