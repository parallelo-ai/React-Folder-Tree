import React, { Component } from 'react';
import FolderComponent from './Components/FolderComponent'; 
import FileComponent from './Components/FileComponent';
import FolderTree from './Components/FolderTree';
import styles from './Components/folderTreeCSS.css';
import {Get} from 'react-axios'

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
          "path" : "/amazing/route",
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


function onChange(data) {
  console.log("onChange received the data:");
  console.log(data);
}

export default class Sandbox extends Component {
  state = {
    data: 1,
    testData: testData,
  }

	render() {
    return (
      <div>
        <h1>Folder Tree with ReactJS</h1>
        <Get url="http://localhost:8080/api/files">
         {(error, response, isLoading, onReload) => {
          if(error) {
            return (
              <div>
                <p>Something bad happened, couldn't get data from the server: {error.message}</p>
                <button onClick={() => onReload({ params: { reload: true } })}>Retry</button>
                <FolderTree      
                   data={response.data}
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
                       checkbox: true 
                     },
                     txt:
                     {
                       checkbox: false
                     }
                   }}
                 />
              </div>);
          }
          else if(isLoading) {
            return (<div>Loading tree...</div>)
          }
          else if(response !== null) {
            // Here we build the directory tree
            return (
              <div>
                <button onClick={() => onReload({ params: { refresh: true } })}>Refresh</button>
                 <FolderTree      
                    data={response.data}
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
                        checkbox: true 
                      },
                      txt:
                      {
                        checkbox: false
                      }
                    }}
                  />
              </div>);
          }
          return (<div>Pending of getting the tree.</div>)
         }}
        </Get>
			</div>
		);
	}
}
