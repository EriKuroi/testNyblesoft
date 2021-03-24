import './clarifyFile.scss'
import { useState } from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root')

const ClarifyFile = ({ handleFile, closeModal }) => {
 
    return (
    
            <> 
                <button onClick={closeModal}>x</button>
                <div>
                    <p>Show us where your save file is located</p>
                        <input type="file" onChange={handleFile}/>
                        <div id="test"></div>
                </div>
               
            </>
    )
};

export default ClarifyFile;