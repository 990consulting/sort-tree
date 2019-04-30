import React, { Component } from "react";
import "./style.css";

/* Box component

    Shows the title - parent's title - index with cross button.
*/

class Box extends Component {
    constructor(props) {
        super(props);

        this.state = {
            onClose: props.onClose,             // callback used for close box notification 
            treepath: props.path                    // tree path - ex: "root-2-1"
        };
    }

    closeBox() {
        this.state.onClose(this.state.treepath);    // notify which box is closed
    }

    render() {
        var { title, parentTitle, index } = this.props;

        return (
            <div>
                <div>
                    <div className="hide-button" onClick={() => { this.closeBox() }}>
                        &times;
                    </div>
                </div>
                <div className="box-content">
                    {title} - {parentTitle} - {index}
                </div>
            </div>
        );
    }
}

export default Box;
