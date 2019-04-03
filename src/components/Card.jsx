import React, { Component } from "react";

export class Card extends Component {
  render() {
    return (
      <div className={"card" + (this.props.grid ? "-grid" : "")}  >
        
        <div
          className={
            "content" +           
            (this.props.grid ? "-grid" : "") +           
            (this.props.contentArea ? "" : " noDisplay" )

          }
        >
          {this.props.content}

         
        </div>
        
      </div>
    );
  }
}

export default Card;