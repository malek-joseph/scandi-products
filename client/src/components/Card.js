import React, { useState } from 'react';

const Card = ({ sku, name, price, size, weight, dimensions, onDelete }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <div className="card">
      <div className="card-header">
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      </div>
      <div className="card-body">
        <div>{sku}</div>
        <div>{name}</div>
        <div>${price}</div>
        {size !== 0 && <div>Size: {size}</div>}
        {weight !== 0 && <div>Weight: {weight}</div>}
        {dimensions !== 0 || "**" && <div>Dimensions: {dimensions}</div>}
      </div>
    </div>
  );
};

export default Card;
