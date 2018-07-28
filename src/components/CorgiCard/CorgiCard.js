import React from "react";
import "./CorgiCard.css";

const CorgiCard = props => (
  <div className="image" col-4>
    <img
      id={props.id}
      src={props.url}
      alt={this.name}
      onClick={() => props.handleImageChange(props.id)}
      />
  </div>
);

export default CorgiCard;