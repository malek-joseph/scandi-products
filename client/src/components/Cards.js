import React from 'react';
import Card from './Card';
import './Cards.css'



const Cards = (products) => {
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

// export default Cards