var assert = require('chai').assert;

let data = {
  "id": 1,
  "filename": "All Categories",
  "children": [
    {
      "id": 2,
      "filename": "For Sale",
      "children": [
        {
          "id": 3,
          "filename": "Audio & Stereo",
          "children": [
    {
      "id": 4,
      "filename": "For Sale",
      "children": [
        {
          "id": 5,
          "filename": "Audio & Stereo",
        },
        {
          "id": 6,
          "filename": "Baby & Kids Stuff",
        },
        {
          "id": 7,
          "filename": "Music, Films, Books & Games",
        }
      ]
    },
    {
      "id": 8,
      "filename": "Motors",
      "children": [
        {
          "id": 9,
          "filename": "Car Parts & Accessories",
        },
        {
          "id": 10,
          "filename": "Cars",
        },
        {
          "id": 11,
          "filename": "Motorbike Parts & Accessories",
        }
      ]
    },
    {
      "id": 12,
      "filename": "Jobs",
      "children": [
        {
          "id": 13,
          "filename": "Accountancy",
        },
        {
          "id": 14,
          "filename": "Financial Services & Insurance",
        },
        {
          "id": 15,
          "filename": "Bar Staff & Management", 
        }
      ]
    }
  ]
        },
        {
          "id": 16,
          "filename": "Baby & Kids Stuff",
        },
        {
          "id": 17,
          "filename": "Music, Films, Books & Games",
        }
      ]
    },
    {
      "id": 18,
      "filename": "Motors",
      "children": [
        {
          "id": 19,
          "filename": "Car Parts & Accessories",
        },
        {
          "id": 20,
          "filename": "Cars",
        },
        {
          "id": 21,
          "filename": "Motorbike Parts & Accessories",
        }
      ]
    },
    {
      "id": 22,
      "filename": "Jobs",
      "children": [
        {
          "id": 23,
          "filename": "Accountancy",
        },
        {
          "id": 24,
          "filename": "Financial Services & Insurance",
        },
        {
          "id": 25,
          "filename": "Bar Staff & Management", 
        }
      ]
    }
  ]
}

describe('test initialize()', () => {
  it('should initialize every node to status = 0, selected = 0', () => {
    data = initialize(data);

    assert.equal(data.status, 0);
    assert.equal(data.selected, 0);
    // this only test for level down, how to call test recursively?
    for (let i = 0; i < data.length; i++) {
      assert.equal(data.children[i].status, 0);
      assert.equal(data.children[i].selected, 0);      
    }

  });
});

describe('test updateAllCheckStatusUp()', () => {
  it('should set all node status to 1 or 0 from top to bottom', () => {
    data = initialize(data);

    // check 1/3
    data.children[0].children[0].children[0].status = 1;
    data = updateAllCheckStatusUp(data, [0, 0, 0]);

    assert.equal(data.children[0].children[0].status, 0.5);
    assert.equal(data.children[0].status, 0.5);
    assert.equal(data.status, 0.5);

    // check 2/3
    data.children[0].children[0].children[1].status = 1;
    data = updateAllCheckStatusUp(data, [0, 0, 0]);

    assert.equal(data.children[0].children[0].status, 0.5);
    assert.equal(data.children[0].status, 0.5);
    assert.equal(data.status, 0.5);

    // check 3/3
    data.children[0].children[0].children[2].status = 1;
    data = updateAllCheckStatusUp(data, [0, 0, 0]);

    assert.equal(data.children[0].children[0].status, 1);
    assert.equal(data.children[0].status, 0.5);
    assert.equal(data.status, 0.5);

  });
});

describe('test updateAllCheckStatusDown()', () => {
  it('should set all node status to 1 or 0 from bottom to top', () => {
    data = initialize(data);

    data = updateAllCheckStatusDown(data, 1);
    assert.equal(data.status, 1);
    assert.equal(data.selected, 0);
    // this only test for level down, how to call test recursively?
    for (let i = 0; i < data.length; i++) {
      assert.equal(data.children[i].status, 1);
      assert.equal(data.children[i].selected, 0);      
    }

    data = updateAllCheckStatusDown(data, 0);
    assert.equal(data.status, 0);
    assert.equal(data.selected, 0);
    // this only test for level down, how to call test recursively?
    for (let i = 0; i < data.length; i++) {
      assert.equal(data.children[i].status, 0);
      assert.equal(data.children[i].selected, 0);      
    }

  });
});













/*############### functions to be tested ###############*/

function filterAllSelected(node, rootFlag = false) {
  const children = node.children;
  const uncheckedRoot = rootFlag && !node.status;
  const hasChildren = children && children.length > 0;

  if (uncheckedRoot) {
    return {};
  } else if (hasChildren) {
    for (let i = 0; i < children.length; i++) {
      children[i] = filterAllSelected(children[i]);
    }
    return filterNode(node);
  } else {
    return node;
  }
}

function filterNode(node) {
  const children = node.children;
  const hasChildren = children && children.length > 0;

  if (hasChildren) {
    let filteredChildren = [];
    for (let i = 0; i < children.length; i++) {
      if (children[i].status) {
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

function initialize(data) {
  if (data.children) {
    for (let i = 0; i < data.children.length; i++)
      data.children[i] = initialize(data.children[i]);
  }
  data.status = 0;
  data.selected = 0;

  return data;
}

function updateAllCheckStatusDown(data, status) {
  const newData = data;
  const children = newData.children;

  if (children) {
    for (let i = 0; i < children.length; i++) {
      children[i] = updateAllCheckStatusDown(children[i], status);
    }
  }
  newData.status = status;
  return newData;
}

function updateAllCheckStatusUp(data, path) {
  if (path.length < 1) {
    console.log('error! path.length should be at least 1!');
    return {};
  }

  if (path.length > 1) {
    const childrenIndexToBeUpdated = path[0];
    path.splice(0, 1);

    const newChildren = updateAllCheckStatusUp(data.children[childrenIndexToBeUpdated], path);
    data.children[childrenIndexToBeUpdated] = newChildren;
  }

  data.status = getCheckStatus(data);

  return data;
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