import React, { Component } from 'react';
import './App.css';
import SortableTree from 'react-sortable-tree';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import treeData from './sample';

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
    static: "fa-snowflake-o",    
};

var isPurple = false;
var isItalic = false;
var isGlobal = false;
var isStatic = false;

class App extends Component {

  constructor(props) {
    super(props);
 
    this.state = {
      treeData: [],
    };
  }

  rootnode = (treeData) => {    
    const rootNode = (<div><i className={hash[treeData.dataType]} aria-hidden="true"></i>{treeData.title}</div>);  
    this.setState({treeData:[{ title: rootNode,  children: treeData.children}]});
  };
  
  eachRecursive = (obj) =>
  {
      for (var k in obj)
      {          
          if (typeof obj[k] === "object" && obj[k] !== null)
          {            
            let type = obj[k]['dataType'];
            let global = obj[k]['global'];
            let static_type = obj[k]['static'];
            let transient = obj[k]['transient'];
            let derived = obj[k]['derived'];
            
            if(type)
              { 
                if(derived){                  
                  isPurple = true;
                }  
                if(transient){                        
                  isItalic = true;
                }   
                if(global){                  
                  isGlobal = true;
                }  
                if(static_type){                        
                  isStatic = true;
                }                              
                obj[k]['title'] = (
                  <div>
                    <div className={isItalic ? 'italic':null}>
                      <i className={`custom_i fa ${hash[type]}`} aria-hidden="true"></i>
                      {isGlobal ? 
                      <i className={`custom_i fa ${hash['global']}`} aria-hidden="true"></i>:null}
                      {isStatic ? 
                      <i className={`custom_i fa ${hash['static']}`} aria-hidden="true"></i>:null}
                      <span className={isPurple ? 'purple':null}>{obj[k]['title']}</span>
                    </div>
                  </div>
                );
              }                   
            this.eachRecursive(obj[k]);
            if(obj[k]['derived'])
              isPurple = false;      
            if(obj[k]['transient'])
              isItalic = false;       
            if(obj[k]['global'])
              isGlobal = false;      
            if(obj[k]['static'])
              isStatic = false;       
          }                        
      }
  }

  componentDidMount() {   
    this.rootnode(treeData);
    this.eachRecursive(treeData.children)
  }

  render() {    
    return (
      <div className="App" style={{ height: 400 }}>
         <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
          theme={FileExplorerTheme}
        />
      </div>
    );
  }
}

export default App;
