import React from 'react';
import Checkbox from './Checkbox';
import styles from './folderTreeCSS.css'

const FolderComponent = ({ level, checked, handleCheck, filename, toggleFolder, open, setMyName, selectMe, selected }) => (
  <div className={styles.folder}>
    {getInden(level)}
    <Checkbox status={checked} handleCheck={handleCheck} />

    <a onClick={toggleFolder}><i className={open? [styles.arrowDown, styles.carat].join(' ')  : [styles.arrowRight, styles.carat].join(' ') } /> </a>

    <span className={selected ? [styles.folderText, styles.selected].join(' ') : styles.folderText} onClick={selectMe}>
      <i className={open? styles.foldeOpenIcon : styles.folderIcon} /> 
      {' ' + filename + ' '}   
    </span>
    <i className={styles.pencilIcon} onClick={() => { setMyName('*' + filename + '*') }} />

  </div>
);

FolderComponent.propTypes = {
  level: React.PropTypes.number.isRequired,
  checked: React.PropTypes.number.isRequired,
  handleCheck: React.PropTypes.func.isRequired,
  filename: React.PropTypes.string.isRequired,
  toggleFolder: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired,
  path: React.PropTypes.array.isRequired, 
  setMyName: React.PropTypes.func.isRequired,
  selectMe: React.PropTypes.func.isRequired,
  selected: React.PropTypes.number.isRequired,
}

function getInden(level) {
  let iden = '', i = 0;
  while (i < level) {
    iden += ' ';
    i++;
  }
  return iden;
}

export default FolderComponent;