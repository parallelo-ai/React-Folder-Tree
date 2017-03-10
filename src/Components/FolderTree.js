import React, { Component } from 'react';
import TreeNode from './TreeNode';
import FolderComponent from './FolderComponent'; 
import FileComponent from './FileComponent';

class FolderTree extends Component {
  static propTypes = {
  	data: React.PropTypes.object.isRequired,
    fileComponent: React.PropTypes.func,
    folderComponent: React.PropTypes.func, 
	};

  static defaultProps = {
    folderComponent: FolderComponent,
    fileComponent: FileComponent,
  };

	constructor(props) {
    super(props);
    this.setRootStatus = this.setRootStatus.bind(this);
    this.setChildName = this.setChildName.bind(this);
    this.setSelectedPath = this.setSelectedPath.bind(this);
    this.setSelected = this.setSelected.bind(this);

    this.state = {
      data: initialize(props.data),
    	checked: 0,
      selectedPath: [],   // path to selected file or folder
    };
  }

  setSelectedPath(path) {
    console.log('setSelectedPath: ' + path)
    this.setSelected(this.state.selectedPath, 0);     // remove CSS from previously selected
    this.setState({selectedPath: path});              // set new path to selected
    this.setSelected(path, 1);                        // add CSS to new selected
  }

  setRootStatus(id, status) {
  	// console.log('set rootStatus ', status)
  	let newData = this.state.data;
  	newData.status = status;
  	this.setState({data: newData});
  }

  printSelectedFileTree() {
    // should exist better way to clone, right now data is const, this might be extra step. i.e. can filter this.state.data directly.
  	let dataCopy = JSON.parse(JSON.stringify(this.state.data));			
 		let selectedTree = JSON.stringify(filterAllSelected(dataCopy, true));
 		console.log('selected tree: ' + selectedTree);
  }

  setChildName(path, name) {
    console.log('setChildName: ', path)

    let newData = this.state.data;
    let ref = newData;
    let i = 0;                      
    while (i < path.length) {
      ref = ref.children[path[i]];  // childre
      i++;
    }
    ref.filename = name;
    this.setState({data: newData});
  }

  setSelected(path, status) {
    let newData = this.state.data;
    let ref = newData;
    let i = 0;   
    while (i < path.length) {
      ref = ref.children[path[i]];  // childre
      i++;
    }
    ref.selected = status;
    this.setState({data: newData});
  }

 	render() {
 			this.printSelectedFileTree();
 			return (
	      <TreeNode
	      	key={this.state.data.id}

	      	category={this.state.data.category}
	      	filename={this.state.data.filename}
	      	children={this.state.data.children? this.state.data.children : []}
	      	id={this.state.data.id}
	      	setChildrenStatus={this.setRootStatus}
	      	level={0}
	      	checked={this.state.data.status}
          selected={this.state.data.selected}

          fileComponent={this.props.fileComponent}
          folderComponent={this.props.folderComponent}

          setName={ (path, name) => { this.setChildName(path, name); } }
          setPath={ path => { this.setSelectedPath(path) } }
          path={[]}
	      />
	    )
	}
}

function filterAllSelected(node, rootFlag = false) {
  if (rootFlag && !node.status) {                    // if it is root and is unchecked 
    return {};
  } else if (node.children != null && node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      node.children[i] = filterAllSelected(node.children[i]);
    }
    return filterNode(node);
  } else {
    return node;
  }
}

function filterNode(node) {
  let children = node.children;                            // current node doesn't change, only filter children
  if (children != null && children.length > 0) {
    let filteredChildren = [];
    for (let i = 0; i < children.length; i++) {
      if (children[i].status) {
        // console.log('children ', children[i].id, ' is checked!')
        filteredChildren.push(children[i]);
      }
    }

    node.children = filteredChildren;
    return node;
  }
  else {
    return node;
  }
}

/* set all initial status to 0, which means unchecked */
function initialize(data) {       
  if (data.children) {
    for (let i = 0; i < data.children.length; i++)
      data.children[i] = initialize(data.children[i]);
  }
  data.status = 0;
  data.selected = 0;

  return data;
}

export default FolderTree;