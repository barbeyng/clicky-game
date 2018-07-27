import React from 'react';

const CorgiCard = props => (
    <div className="card">
    <div className="img-container">
      <img alt={props.id} 
      key={props.id}
      name={props.name}
      onClick={() => {props.imageClick(props.id)}}
      src={props.image} />
    </div>
  </div>
)

export default CorgiCard;