import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import '../components/Cards.css'

// =========================



const ProductList = () => {
  const [products, setProducts] = useState([]);


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

  const handleDelete = () => {
    const checkedProductIds = products.filter(product => product.checked).map(product => product.id);

    axios.delete('/delete', { checkedProductIds })
      .then(response => {
        const deletedCount = response.data;

        setProducts(products => products.filter(product => !product.checked));

        console.log(`Deleted ${deletedCount} products`);
      })
      .catch(error => {
        console.error(`Error deleting products: ${error.message}`);
      });
  }
  

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
          />
        </div>
      ));
    };
    return <div className="card-row">{renderCards()}</div>;
  };


 

  return (
    <>
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
            <button type="button" className="btn btn-secondary" onClick={handleDelete}>Mass Delete</button>
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
    </>
  )
}

export default ProductList