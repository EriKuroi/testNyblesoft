import './clarifyFile.scss';
import PropTypes from 'prop-types';

const ClarifyFile = ({ loadFile, closeModal }) => {
    return (
        <>
            <button onClick={closeModal}>x</button>
            <div className="choose-file-area">
                <p>Show us where your save file is located</p>
                <input type="file" onChange={loadFile} />
                <div id="test"></div>
            </div>
        </>
    )
};

ClarifyFile.propTypes = {
    loadFile: PropTypes.func,
    closeModal: PropTypes.func
};
ClarifyFile.defaultProps = {
    loadFile: () => { console.error('Oops, cant find loadFile function') },
    closeModal: () => { console.error('Oops, cant find closeModal function') }
};

export default ClarifyFile;