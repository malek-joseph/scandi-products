import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
// import Card from '../components/Card';
import '../components/Cards.css'
// =========================
const ProductList = () => {
//=========API: getting Products from db to UI
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const init = () => {
    axios.get('http://localhost:8002/api/').then((res) => {
      if (res.error) {
        console.log(res.error);
      } else {
        setProducts(res.data);
      }
    });
  };
  useEffect(() => {
    init()
  }, [])

  const handleProductSelection = (sku) => {
    setSelectedProducts((selectedProducts) => {
      if (selectedProducts.includes(sku)) {
        return selectedProducts.filter((selectedSku) => selectedSku !== sku);
      } else {
        return [...selectedProducts, sku];
      }
    });
  };
  //=========API: deleting Cards from db and UI 
  const handleMassDelete = () => {
    // console.log(selectedProducts);
    axios.delete('http://localhost:8002/api/delete', { data: { skus: selectedProducts } })
      .then(response => {
        setProducts((products) =>
          products.filter((product) => !selectedProducts.includes(product.sku))
        );
        setSelectedProducts([]);
      })
      .catch(error => {
        console.error(`Error deleting products: ${error.message}`);
      });
  }
  //=========Card  UI
  const Card = ({ sku, name, price, size, weight, dimensions, isChecked }) => {
    return (
      <div className="card">
        <div className="card-header">
          <input type="checkbox" className='delete-checkbox'
            checked={isChecked}
            onChange={() => handleProductSelection(sku)} />
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
//=========Cards  UI
  const loadCards = (products) => {
    const renderCards = () => {
      return products?.map((product) => (
        <div className="card-column" key={product.sku}>
          <Card
            sku={product.sku}
            name={product.name}
            price={product.price}
            size={product.size}
            weight={product.weight}
            dimensions={product.dimensions}
            isChecked={selectedProducts.includes(product.sku)}
            onChange={() => handleProductSelection(product.sku)}
          />
        </div>
      ));
    };
    return <div className="card-row">{renderCards()}</div>;
  };
  return (
    <div className="container my-4 " style = {{ paddingBottom: '20%' }
}>
      {/* ======Header===== */}
      <div className="row sticky-top p-3">
        <div className="col-6">
          <h2>Product List</h2>
        </div>
        <div className="col-6 d-flex justify-content-end align-items-center">
          <div className="form-group">
            <NavLink to="/add-product">
              <button type="submit" className="btn btn-primary me-2">Add</button>
            </NavLink>
            <button type="button" id='delete-product-btn' className="btn btn-danger"
              disabled={selectedProducts.length === 0}
              onClick={handleMassDelete}  >Mass Delete</button>
          </div>
        </div>
      </div>
      <hr className='mt-3' />
      {/* ======Cards===== */}
      {loadCards(products)}
      {/* ======Footer===== */}
      <div className="fixed-bottom bg-light d-flex align-items-center justify-content-center" style={{ height: '20%' }}>
        <hr style={{ borderTop: '1px solid #ddd' }} />
        <br />
        <p className="text-muted text-center" style={{ fontSize: '0.8rem' }}>Scandiweb Test Assignment</p>
      </div>
    </div>
  )
}

export default ProductList