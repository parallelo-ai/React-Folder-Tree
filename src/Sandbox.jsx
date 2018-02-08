import React, { Component } from 'react';
import FolderComponent from './Components/FolderComponent'; 
import FileComponent from './Components/FileComponent';
import FolderTree from './Components/FolderTree';

import styles from './Components/folderTreeCSS.css';

const testData = {
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
          "filename": "Audio & Stereo.shp",
        },
        {
          "id": 6,
          "filename": "Baby & Kids Stuff.csv",
        },
        {
          "id": 7,
          "filename": "Music, Films, Books & Games.txt",
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

const testData2 = {
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
    ]}]

}


function onChange(data) {
  console.log("onChange received the data:");
  console.log(data);
}

export default class Sandbox extends Component {
  state = {
    data: 1,
    testData: testData,
  }

  changeData = () => {
    console.log('change data!')
    let newTestData = {};
    let newData = this.state.data * (-1);
    if (newData === 1) 
      newTestData = testData;
    else 
      newTestData = testData2;
    this.setState({testData: newTestData, data: newData});
  }

	render() {
		return (
      <div>
        <h1>Folder Tree with ReactJS</h1>
        <button onClick={this.changeData}>Click me!</button>
			  <FolderTree
			  	data={this.state.testData}
			    fileComponent={FileComponent}
			    folderComponent={FolderComponent}
          onChange={onChange}
          nodeProps={{
            shp:
            {
              checkbox: true
            },
            csv:
            {
              checkbox: false
            },
            txt:
            {
              checkbox: false
            }
          }}
			  />
			</div>
		);
	}
}
