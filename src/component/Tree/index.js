import React, { Component } from "react";
import "./style.css";
import SortableTree, { getNodeAtPath, addNodeUnderParent, removeNodeAtPath, changeNodeAtPath } from "react-sortable-tree";
import FileExplorerTheme from "react-sortable-tree-theme-file-explorer";
import { Menu, Item } from "react-contexify";
import "react-contexify/dist/ReactContexify.min.css";
import { contextMenu } from "react-contexify";

// icons for tree node
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

var curSelected = [];       // current selected tree node (used for context menu)
var isInside = false;       // check right click is occured on outside of tree

// Context Menu
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

// Generate title with icon
export function getHTMLTitle(node) {
    var isPurple = false,
        isItalic = false,
        isGlobal = false,
        isStatic = false,
        isSystem = false;

    let type = node["dataType"];
    let global = node["global"];
    let static_type = node["static"];
    let transient = node["transient"];
    let derived = node["derived"];
    let system = node["system"];
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

        return (
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
                        {node["titleText"]}
                    </span>
                </div>
            </div>
        );
    }
}

/* Tree Component

    Add, Duplicate, Change, Delete node.

*/

class Tree extends Component {
    constructor(props) {
        super(props);

        this.state = {
            treeData: props.treeData,           // tree data 
            onChange: props.onChange,           // callback function to nofity tree node data has been changed
            selected: null,
            preSelected: null
        };

        // bind this to functions
        this.RAction = this.RAction.bind(this);
        this.addNode = this.addNode.bind(this);
        this.duplicateNode = this.duplicateNode.bind(this);
        this.changeNode = this.changeNode.bind(this);
        this.removeNode = this.removeNode.bind(this);
    }

    // Add Tree node 
    // rowInfo: selected tree node
    // title:   title of new node
    addNode(rowInfo, title) {
        let NEW_NODE = { title: title };
        let { path } = rowInfo;
        // let SortableTree add new node and get new tree data 
        // use SortableTree component functions
        let currentNode = getNodeAtPath({
            treeData: this.state.treeData,
            path: path,
            getNodeKey: ({ treeIndex }) => treeIndex,
            ignoreCollapsed: true
        });
        let getNodeKey = ({ node: object, treeIndex: number }) => {
            return number;
        };
        let parentKey = getNodeKey(currentNode);
        if (parentKey === -1) {
            parentKey = null;
        }

        // add tree node to SortableTree
        let newTree = addNodeUnderParent({
            treeData: this.state.treeData,
            newNode: NEW_NODE,
            expandParent: true,
            parentKey: parentKey,
            getNodeKey: ({ treeIndex }) => treeIndex
        });

        // change status of component
        this.setState({ treeData: newTree.treeData });
        // notify to parent element
        this.state.onChange(newTree.treeData);
    }

    // make clone of Object
    cloneObject(obj) {
        var copy;

        // Handle the 3 simple types, and null or undefined
        if (null == obj || "object" != typeof obj) return obj;

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (var i = 0, len = obj.length; i < len; i++) {
                copy[i] = this.cloneObject(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = this.cloneObject(obj[attr]);
            }
            return copy;
        }

        throw new Error("Unable to copy obj! Its type isn't supported.");
    }

    // duplicate tree node
    // rowInfo: selected tree node
    duplicateNode(rowInfo) {
        let NEW_NODE = this.cloneObject(rowInfo.node);
        let { path } = rowInfo;
        path.pop();                                                 // remove last item to get parent node
        NEW_NODE.titleText = "Duplicate of " + NEW_NODE.titleText;  // make new title      
        NEW_NODE.title = getHTMLTitle(NEW_NODE);                    // make HTMLTitle with new title

        // get parent node of current node
        let parentNode = getNodeAtPath({
            treeData: this.state.treeData,
            path: path,
            getNodeKey: ({ treeIndex }) => treeIndex,
            ignoreCollapsed: true
        });
        let getNodeKey = ({ node: object, treeIndex: number }) => {
            return number;
        };
        let parentKey = getNodeKey(parentNode);
        if (parentKey === -1) {
            parentKey = null;
        }
        let newTree = addNodeUnderParent({
            treeData: this.state.treeData,
            newNode: NEW_NODE,
            expandParent: true,
            parentKey: parentKey,
            getNodeKey: ({ treeIndex }) => treeIndex
        });

        // change status of component
        this.setState({ treeData: newTree.treeData });
        // notify to parent element
        this.state.onChange(newTree.treeData);
    }

    // change title of tree node
    // rowInfo: selected tree node
    changeNode(rowInfo, title) {
        let NEW_NODE = Object.assign({}, rowInfo.node);
        let { path } = rowInfo;
        NEW_NODE.titleText = title;                     // set new title of tree node
        NEW_NODE.title = getHTMLTitle(NEW_NODE);        // set new HTML title of tree node

        // change tree node of SortableTree
        let newTree = changeNodeAtPath({
            treeData: this.state.treeData,
            newNode: NEW_NODE,
            path: path,
            getNodeKey: ({ treeIndex }) => treeIndex,
            ignoreCollapsed: true,
        });

        // change status of component
        this.setState({ treeData: newTree });
        // notify to parent element
        this.state.onChange(newTree);
    }

    // remove tree node
    // rowInfo: tree node to delete
    removeNode(rowInfo) {
        let { path } = rowInfo;
        // remove node from SortableTree and get the new treeData
        var newTree = removeNodeAtPath({
            treeData: this.state.treeData,
            path: path,   // You can use path from here
            getNodeKey: ({ node: TreeNode, treeIndex: number }) => {
                return number;
            },
            ignoreCollapsed: true,
        });
        // change status of component
        this.setState({ treeData: newTree });
        // notify to parent element
        this.state.onChange(newTree);
    }

    // Context-Menu Action
    // type: action type (add, duplicate, rename, delete)
    RAction(treeData, type) {
        if (type === "add") {
            console.log("Add Child " + JSON.stringify(treeData.path));
            var title = prompt("Please input title", "");

            if (title != null) {
                this.addNode(treeData, title);
            }
        }
        if (type === "duplicate") {
            console.log("Duplicate " + JSON.stringify(treeData.path));
            this.duplicateNode(treeData);
        }
        if (type === "rename") {
            console.log("Rename " + JSON.stringify(treeData.path));
            var newTitle = prompt("Please input title", "");

            if (newTitle != null) {
                this.changeNode(treeData, newTitle);
            }
        }
        if (type === "delete") {
            console.log("Delete " + JSON.stringify(treeData.path));
            this.removeNode(treeData);
        }
    }

    // callback for node changed from SortableTree (ex: by dragging)
    nodeChange = treeData => {
        this.setState({ treeData });        // set new status of tree data

        this.state.onChange(treeData);      // notify to parent element (App)
    };

    // Get node from sibling
    // sibling: sibling path (array of index)
    // ex - [1, 2, 0] (index from last)
    getNodeFromSibling(sibling) {
        var parent = this.state.treeData;
        var currNode = parent;
        var i;

        for (i = 0; i < sibling.length; i++) {
            parent = currNode[currNode.length - 1 - sibling[i]];        // get node from last
            currNode = parent.children;
        }

        return parent;
    }

    // callback for node click
    // nodeData: clicked node data    
    nodeClick = nodeData => {
        this.setState({ selected: nodeData.path });
        var node = this.getNodeFromSibling(nodeData.lowerSiblingCounts);    // get node from treeData by sibling
        node.isShowBox = true;                                              // set isShwoBox status as true

        this.state.onChange(this.state.treeData);                           // notify to parent element (App)
    };

    // ContextMenu 
    // e: HTMLEvent
    // treeData: --    
    ContextMenu = (e, treeData) => {
        e.preventDefault();     // restrict normal right-click context menu
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

    // canDrop
    // check the node can be placed in nextParent
    // node: current draggin node
    // nextParent: drop position
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

    // OutSideMenu
    // if mouse right-clicked on out of tree boundary, shows OutSideMenu
    OutSideMenu(e) {
        if (!isInside) {
            e.preventDefault();
            contextMenu.show({ id: "menu_id4", event: e });
        }
        isInside = false;
    }

    render() {
        return (
            <div style={{ height: '100%' }} onContextMenu={this.OutSideMenu}>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={this.nodeChange}
                    theme={FileExplorerTheme}
                    nextParent
                    canDrop={({ node, nextParent }) => this.canDrop(node, nextParent)}
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

export default Tree;
