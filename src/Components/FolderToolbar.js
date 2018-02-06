import PropTypes from 'react-proptypes';
import React, { Component } from 'react';
import styles from './folderTreeCSS.css';

class FolderToolbar extends Component {
	static propTypes = {
		deleteObj: PropTypes.func.isRequired,	
		toggleAddingNewFile: PropTypes.func.isRequired,	
	};

	render() {
		return (
			<div className={styles.folderToolbar}>
				<div className={styles.addButton} onClick={this.props.toggleAddingNewFile}><i className={styles.addIcon} /> Add</div>
				<div className={styles.deleteButton} onClick={ () => { this.props.deleteObj(); } }><i className={styles.deleteIcon} /> Delete</div>
			</div>
		);
	}

}

export default FolderToolbar;