import React, { Component } from "react";
import "./App.css";
import SortableTree from "react-sortable-tree";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import treeData from "./sample";
import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.min.css";
import { contextMenu } from "react-contexify";

const hash = {
  root: "fa fa-joomla custom_i",
  list: "fa-server",
  map: "fa-folder",
  integer: "fa-superscript",
  currency: "fa-money",
  text: "fa-font",
  date: "fa-calendar-o",
  binary: "fa-balance-scale",
  unary: "fa-check-circle",
  decimal: "fa-calculator",
  global: "fa-globe",
  static: "fa-snowflake-o"
};

var isPurple = false,
  isItalic = false,
  isGlobal = false,
  isStatic = false,
  isSystem = false;
var curSelected = [];
var isInside = false;
var MyAwesomeMenu1 = ({ menuId, RAction }) => (
  <Menu id={menuId}>
    <Item onClick={() => RAction(curSelected, "add")}>AddChild</Item>
  </Menu>
);
var MyAwesomeMenu2 = ({ menuId, RAction }) => (
  <Menu id={menuId}>
    <Item onClick={() => RAction(curSelected, "duplicate")}>Duplicate</Item>
    <Item onClick={() => RAction(curSelected, "rename")}>Rename</Item>
    <Item onClick={() => RAction(curSelected, "delete")}>Delete</Item>
  </Menu>
);
var MyAwesomeMenu3 = ({ menuId, RAction }) => (
  <Menu id={menuId}>
    <Item onClick={() => RAction(curSelected, "add")}>AddChild</Item>
    <Item onClick={() => RAction(curSelected, "duplicate")}>Duplicate</Item>
    <Item onClick={() => RAction(curSelected, "rename")}>Rename</Item>
    <Item onClick={() => RAction(curSelected, "delete")}>Delete</Item>
  </Menu>
);
var OutSide = ({ menuId }) => (
  <Menu id={menuId}>
    <Item>Add local container...</Item>
    <Item>Add global container...</Item>
  </Menu>
);
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treeData: [],
      selected: null,
      preSelected: null
    };
  }
  RAction(treeData, type) {
    if (type === "add") {
      console.log("Add Child " + JSON.stringify(treeData.path));
    }
    if (type === "duplicate") {
      console.log("Duplicate " + JSON.stringify(treeData.path));
    }
    if (type === "rename") {
      console.log("Rename " + JSON.stringify(treeData.path));
    }
    if (type === "delete") {
      console.log("Delete " + JSON.stringify(treeData.path));
    }
  }
  rootnode = treeData => {
    //const rootNode = (<div className='a'><i className={hash[treeData.dataType]} aria-hidden="true"></i>{treeData.title}</div>);
    this.setState({ treeData: treeData });
  };

  eachRecursive = (obj, nodeTitle) => {
    for (var k in obj) {
      if (typeof obj[k] === "object" && obj[k] !== null) {
        let type = obj[k]["dataType"];
        let global = obj[k]["global"];
        let static_type = obj[k]["static"];
        let transient = obj[k]["transient"];
        let derived = obj[k]["derived"];
        let system = obj[k]["system"];
        if (type) {
          if (derived) {
            isPurple = true;
          }
          if (transient) {
            isItalic = true;
          }
          if (global) {
            isGlobal = true;
          }
          if (static_type) {
            isStatic = true;
          }
          if (system === true) {
            isSystem = true;
          }
          obj[k]["title"] = (
            <div>
              <div className={isItalic ? "italic" : null}>
                <i className={`custom_i fa ${hash[type]}`} aria-hidden="true" />
                {isGlobal ? (
                  <i
                    className={`custom_i fa ${hash["global"]}`}
                    aria-hidden="true"
                  />
                ) : null}
                {isStatic ? (
                  <i
                    className={`custom_i fa ${hash["static"]}`}
                    aria-hidden="true"
                  />
                ) : null}
                <span
                  className={isSystem ? "grey" : isPurple ? "purple" : null}
                >
                  {obj[k]["title"]}
                </span>
              </div>
            </div>
          );
        }

        this.eachRecursive(obj[k]);

        if (obj[k]["derived"]) isPurple = false;
        if (obj[k]["transient"]) isItalic = false;
        if (obj[k]["global"]) isGlobal = false;
        if (obj[k]["static"]) isStatic = false;
        if (obj[k]["system"] !== true) isSystem = false;
      }
    }
  };

  componentDidMount() {
    this.rootnode(treeData);
    this.eachRecursive(treeData, null);
  }
  nodeChange = treeData => {
    this.setState({ treeData });
  };
  nodeClick = treeData => {
    this.setState({ selected: treeData.path });
  };
  ContextMenu = (e, treeData) => {
    e.preventDefault();
    isInside = true;
    curSelected = treeData;
    var isAddMenu = false;
    var isDRDMenu = false;
    if (
      curSelected.node.dataType &&
      (curSelected.node.dataType === "list" ||
        curSelected.node.dataType === "root" ||
        curSelected.node.dataType === "map")
    )
      isAddMenu = true;
    else if (curSelected.treeIndex === 0) isAddMenu = true;

    if (
      treeData.node.dataType &&
      (treeData.node.dataType !== "root" && treeData.node.system !== true)
    )
      isDRDMenu = true;

    if (isAddMenu === true && isDRDMenu === true)
      contextMenu.show({ id: "menu_id3", event: e });
    else if (isAddMenu === true && isDRDMenu === false)
      contextMenu.show({ id: "menu_id1", event: e });
    else if (isAddMenu === false && isDRDMenu === true)
      contextMenu.show({ id: "menu_id2", event: e });
  };
  canDrop(node, nextParent) {
    if (!nextParent) {
      if (
        node.dataType === "root" ||
        node.dataType === "list" ||
        node.dataType === "map"
      )
        return true;
      return false;
    }
    if (nextParent.static === true && node.static !== true) return false;
    if (nextParent.global === true && node.global !== true) return false;
    if (nextParent.derived === true && node.derived !== true) return false;
    if (
      nextParent.transient === true &&
      node.transient !== true &&
      node.system !== true
    )
      return false;
    if (
      nextParent.dataType &&
      !(
        nextParent.dataType === "root" ||
        nextParent.dataType === "list" ||
        nextParent.dataType === "map"
      )
    )
      return false;
    return true;
  }
  OutSideMenu(e) {
    if (!isInside) {
      e.preventDefault();
      contextMenu.show({ id: "menu_id4", event: e });
    }
    isInside = false;
  }
  render() {
    return (
      <div>
        <div
          className="App"
          style={{ height: 2000 }}
          onContextMenu={this.OutSideMenu}
        >
          <SortableTree
            treeData={this.state.treeData}
            onChange={this.nodeChange}
            theme={FileExplorerTheme}
            nextParent
            canDrop={({ node, nextParent }) => this.canDrop(node, nextParent)}
            //	  onVisibilityToggle= {this.nodeClick}
            /*onMoveNode={() =>
						this.checknode()
					}*/
            generateNodeProps={rowInfo => ({
              buttons: [
                <div
                  onClick={() => this.nodeClick(rowInfo)}
                  onContextMenu={event => this.ContextMenu(event, rowInfo)}
                  className={
                    JSON.stringify(this.state.selected) ===
                    JSON.stringify(rowInfo.path)
                      ? "selected"
                      : "noSelected"
                  }
                />
              ]
            })}
          />
        </div>
        <div>
          <MyAwesomeMenu1 menuId="menu_id1" RAction={this.RAction} />
          <MyAwesomeMenu2 menuId="menu_id2" RAction={this.RAction} />
          <MyAwesomeMenu3 menuId="menu_id3" RAction={this.RAction} />
          <OutSide menuId="menu_id4" />
        </div>
      </div>
    );
  }
}

export default App;
