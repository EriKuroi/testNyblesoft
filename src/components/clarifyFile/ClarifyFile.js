import './clarifyFile.scss'

const ClarifyFile = ({ handleFile, closeModal }) => {
 
    return (
    
            <> 
                <button onClick={closeModal}>x</button>
                <div className="choose-file-area">
                    <p>Show us where your save file is located</p>
                        <input type="file" onChange={handleFile}/>
                        <div id="test"></div>
                </div>
               
            </>
    )
};

export default ClarifyFile;