import React from 'react';
import PropTypes from 'react-proptypes';
import Checkbox from './Checkbox';
import EditableName from './EditableName';
import styles from './folderTreeCSS.css'
import amICheckboxed from './amICheckboxed';

const FileComponent = ({ level, checked, checkboxed, handleCheck, filename, setMyName, selectMe, selected }) => (
  <div className={styles.file} style={{marginLeft: getInden(level)}}>
    {amICheckboxed(checkboxed,checked,handleCheck)}
    <span className={selected ? [styles.fileText, styles.selected].join(' ') : styles.fileText} onClick={selectMe}>
      <i className={styles.fileIcon} style={{marginLeft: '10px'}} /> 
      <EditableName filename={filename} setMyName={setMyName} selected={selected} />
    </span>

  </div>
);

FileComponent.propTypes = {
  path: PropTypes.array.isRequired, 
  level: PropTypes.number.isRequired,
  checked: PropTypes.number.isRequired,
  checkboxed: PropTypes.bool.isRequired,
  filename: PropTypes.string.isRequired,
  selected: PropTypes.number.isRequired,
  
  selectMe: PropTypes.func.isRequired,
  setMyName: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
};

function getInden(level) {
  return `${5 * level}px`;
}

export default FileComponent;
