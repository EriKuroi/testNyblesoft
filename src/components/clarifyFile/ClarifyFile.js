import './clarifyFile.scss'
import PropTypes from 'prop-types';

const ClarifyFile = ({ handleFile, closeModal }) => {

    return (

        <>
            <button onClick={closeModal}>x</button>
            <div className="choose-file-area">
                <p>Show us where your save file is located</p>
                <input type="file" onChange={handleFile} />
                <div id="test"></div>
            </div>

        </>
    )
};

ClarifyFile.propTypes = {
    handleFile: PropTypes.func,
    closeModal: PropTypes.func
};
ClarifyFile.defaultProps = {
    handleFile: () => { console.error('Oops, cant find handleFile function') },
    closeModal: () => { console.error('Oops, cant find closeModal function') }
};

export default ClarifyFile;