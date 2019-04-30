import React, { Component } from "react";
import "./App.css";

import treeData from "./sample";

import Tree, { getHTMLTitle } from "./component/Tree";
import Box from "./component/Box";

import GridLayout from 'react-grid-layout';
import "../node_modules/react-grid-layout/css/styles.css";
import "../node_modules/react-resizable/css/styles.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: treeData,       // tree data
      boxGenerated: []          // generated box html elements
    };
  }

  // eachRecursive (recursive function)
  // make html title of all of tree node
  eachRecursive = (obj) => {
    for (var k in obj) {
      if (typeof obj[k] === "object" && obj[k] !== null) {
        let type = obj[k]["dataType"];
        if (type) {
          obj[k]["titleText"] = obj[k]["title"];

          obj[k]["title"] = getHTMLTitle(obj[k]);   // make HTML title (icon) of tree node
        }

        this.eachRecursive(obj[k]);
      }
    }
  };

  componentDidMount() {
    this.eachRecursive(this.state.treeData);
  }

  // get tree node from index list
  // idxList: index array of tree node
  // ex - [1, 2, 0] 
  // return value: tree node value
  getNodeFromIndex(idxList) {
    var parent = this.state.treeData;
    var currNode = parent;
    var i;

    for (i = 0; i < idxList.length; i++) {
      parent = currNode[idxList[i]];
      currNode = parent.children;
    }

    return parent;
  }

  // onBoxClose
  // key: index array string    "root-0-2-3"
  onBoxClose(key) {
    var idxList = key.split("-");
    idxList.shift();                            // remove first element("root")
    var node = this.getNodeFromIndex(idxList);  // get tree node from index array
    node.isShowBox = false;                     // set isShowBox as false
    this.forceUpdate();                         // redraw
  }

  // generateBoxes (recursive function)
  // make boxes array if isShowBox is true
  // subTreeData: sub-tree
  // parentTitle: title of parent node, "root" for root node
  // parentKey: index array string of parent (like "root-0-2")  
  generateBoxes(subTreeData, parentTitle, parentKey) {
    for (var k in subTreeData) {
      if (typeof subTreeData[k] === "object" && subTreeData[k] !== null) {
        var currPath = parentKey + "-" + k;                                 //make index array string of current node
        if (subTreeData[k].isShowBox) {
          this.state.boxGenerated.push(
            <div key={currPath} className="box-div" data-grid={{ x: 0, y: 0, w: 6, h: 1 }}>
              <Box path={currPath} title={subTreeData[k].title} parentTitle={parentTitle} index={k} onClose={(key) => { this.onBoxClose(key) }} />
            </div>
          );
        }

        this.generateBoxes(subTreeData[k].children, subTreeData[k].title, currPath)
      }
    }
  }

  render() {
    this.state.boxGenerated = [];
    this.generateBoxes(this.state.treeData, "root", "root");      //generate boxes from root
    return (
      <div className="App" >
        <GridLayout className="layout" cols={12} rowHeight={50} width={1200}>
          <div key="a" className="treepanel-div" data-grid={{ x: 0, y: 0, w: 6, h: 6, isResizable: true, isDraggable: false }}>
            <Tree treeData={this.state.treeData} onChange={(treeData) => { this.setState({ treeData: treeData }) }} />
          </div>
          {this.state.boxGenerated}
        </GridLayout>
      </div>
    );
  }
}

export default App;
