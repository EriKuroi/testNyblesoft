import './clarifyFile.scss'

const ClarifyFile = ({ handleClick }) => {
    return (
        <section className="clarify-file-area">
            <h2>Weirdly easy to use!</h2>
            <p>Your notes are saved in one file on your computer, so just show us where it is or create new one</p>
     <div>
           <button id="show" onClick={handleClick}>Show</button>
           <button id="create" onClick={handleClick}>Create</button>
     </div>
        </section>
    )
};

export default ClarifyFile;