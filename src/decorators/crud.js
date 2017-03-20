import React from 'react';

function initialize(data) {
  if (data.children) {
    for (let i = 0; i < data.children.length; i++)
      data.children[i] = initialize(data.children[i]);
  }
  data.status = 0;
  data.selected = 0;

  return data;
}

function getNumOfFiles(data) {
  let sum = 0;
  if (data.children) {
    data.children.forEach(subData => {
      sum += getNumOfFiles(subData);
    });
  } else {
    return 1;
  }
  return sum + 1;
}

function getCheckStatus(obj) {
  const children = obj.children;
  const length = children.length;
  let sum = 0;
  if (children) {
    for (let i = 0; i < length; i++) {
      sum += children[i].status;
    }
  }

  if (sum === 0 ) {
    return 0;
  } else if (sum === length) {
    return 1;
  } else {
    return 0.5;
  }
}

const connectCrud = (options = {}) => Component =>
  class CRUDComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: initialize(props.data),
        addingNewFile: false,
        selectedPath: [],   // path to selected file or folder
      };
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.data !== this.state.data) {
        this.setState({data: initialize(nextProps.data)});
      }
    }

    onChange = () => {
      const dataDeepClone = JSON.parse(JSON.stringify(this.state.data));
      const selectedTree = JSON.stringify(filterAllSelected(dataDeepClone, true));
      this.props.onChange(selectedTree);
    }

    setSelectedPath = (path) => {
      let newData = this.state.data
      let ref = newData;
      let i = 0;
      let currentPath = this.state.selectedPath;

      // console.log('currentPath: ' + currentPath);
      while (i < currentPath.length) {
        ref = ref.children[currentPath[i]];
        i++;
      }
      ref.selected = 0;

      i = 0;
      ref = newData;
      while (i < path.length) {
        ref = ref.children[path[i]];
        i++;
      }
      ref.selected = 1;

      this.setState({
        data: newData,
        selectedPath: path,
      }, );
    }

    toggleAddingNewFile = () => {
      this.setState(prevState => ({
        addingNewFile: !prevState.addingNewFile,
      }));
    };

    addNewFileInSelectedObj = (filename) => {
      let path = this.props.selectedPath;
      let newData = this.state.data;
      let ref = newData;
      let i = 0;
      let parentStatus = 0;

      while (i < path.length) {
        ref = ref.children[path[i]];
        i++;
      }

      if (ref.status === 1)
        parentStatus = 1;
      else
        parentStatus = 0;

      const newfile = {
        id: this.state.numOfFiles + 1,
        filename: filename,
        status: parentStatus,
        selected: 0,
      };

      if (!ref.children) {
        ref.children = [];
      }

      ref.children.push(newfile);
      this.setState(prevState => ({
        data: newData,
        numOfFiles: prevState.numOfFiles + 1,
      }), () => this.onChange());
    };

    deleteSelectedObj = () => {
      let selectedPath = this.state.selectedPath;
      let newData = this.state.data;
      let ref = newData;
      let i = 0;

      while (i < selectedPath.length - 1) {
        ref = ref.children[selectedPath[i]];
        i++;
      }

      ref.children.splice(selectedPath[i], 1);

      let parentCheckStatus = ref.status;
      if (ref.children && ref.children.length !== 0) {
        parentCheckStatus = getCheckStatus(ref);
      }

      if (ref.status !== parentCheckStatus) {
        ref.status = parentCheckStatus;
        newData = updateAllCheckStatusUp(newData, selectedPath)
      }

      this.setState(prevState => ({
        data: newData,
        selectedPath: [],
        numOfFiles: getNumOfFiles(newData),
      }), () => this.onChange());
    };

    setChildName = (path, name) => {
      let newData = this.state.data;
      let ref = newData;
      let i = 0;
      while (i < path.length) {
        ref = ref.children[path[i]];
        i++;
      }
      ref.filename = name;
      this.setState({data: newData}, () => this.onChange());
    };

    render() {
      return (
        <Component
          data={this.state.data}
          toggleAddingNewFile={this.toggleAddingNewFile}
          deleteObj={this.deleteSelectedObj}
          setSelectedPath={this.setSelectedPath}
        />
      )
    }
  };

  export default connectCrud;
