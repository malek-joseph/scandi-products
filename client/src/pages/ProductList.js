import React, { useState } from 'react';
import { toast } from "react-toastify";
import './ProductAdd.css'
import { NavLink } from 'react-router-dom';

// =========================
const Card = ({ sku, name, price, size, checked, onCheck }) => (
  <div className="card">
    <div className="card-header">
      <input type="checkbox" checked={checked} onChange={onCheck} />
    </div>
    <div className="card-body">
      <div>{sku}</div>
      <div>{name}</div>
      <div>{price}</div>
      <div>{size}</div>
    </div>
  </div>
);

const CardRow = ({ cards, onCardCheck }) => (
  <div className="card-row">
    {cards?.map((card) => (
      <Card
        key={card.sku}
        sku={card.sku}
        name={card.name}
        price={card.price}
        size={card.size}
        checked={card.checked}
        onCheck={() => onCardCheck(card.sku)}
      />
    ))}
  </div>
);




// =========================

const ProductList = ({ cards, onCardCheck, onSaveSelection, onDeleteChecked }) => {

  

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    cards.forEach((card) => {
      if (card.checked !== isChecked) {
        onCardCheck(card.sku);
      }
    });
  };

  const handleSaveSelection = () => {
    const selectedCards = cards.filter((card) => card.checked);
    onSaveSelection(selectedCards);
  };

  const handleDeleteChecked = () => {
    const checkedCards = cards.filter((card) => card.checked);
    onDeleteChecked(checkedCards);
  };

  return (
    <>
      <div className="row sticky-top p-3">
        <div className="col-6">
          <h2>Product List</h2>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center">
          <div className="form-group">
            <NavLink to="/add-product">
              <button type="submit" className="btn btn-primary me-2">Add</button>

            </NavLink>
            <button type="button" className="btn btn-secondary" >Mass Delete</button>
          </div>
        </div>
    
      </div>

      <hr className='mt-3' />



      {/* =========== */}

      <div className="fixed-bottom bg-light d-flex align-items-center justify-content-center" style={{ height: '20%' }}>
        <hr style={{ borderTop: '1px solid #ddd' }} />
        <br />
        <p className="text-muted text-center" style={{ fontSize: '0.8rem' }}>Scandiweb Test Assignment</p>
      </div>
    </>
  )
}

export default ProductList