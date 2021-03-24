import './clarifyFile.scss'
import { useState } from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root')

const ClarifyFile = ({ handleFile    }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalType, setModalType] = useState('show')
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)'
        }
    };

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <section className="clarify-file-area">
            <h2>Weirdly easy to use!</h2>
            <p>Your notes are saved in one file on your computer, so just show us where it is or create new one</p>
            <div>
                <button id="show" onClick={openModal}>Show</button>
                <button id="create" onClick={openModal}>Create</button>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className="Modal"
                overlayClassName="Overlay"
            > 
                <button onClick={closeModal}>x</button>
                {modalType === 'show' &&<div>
                    <p>Show us where your save file is located</p>
                        <input type="file" onChange={handleFile}/>
                        <div id="test"></div>
                </div>}
               
            </Modal>
        </section>
    )
};

export default ClarifyFile;