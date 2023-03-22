import React from 'react';

const products = [
  {
    sku: '12345',
    name: 'Product 1',
    price: 9.99,
    size: 'Small',
    dimension: '10x10x10cm'
  },
  {
    sku: '67890',
    name: 'Product 2',
    price: 19.99,
    size: 'Medium',
    dimension: '20x20x20cm'
  },
  {
    sku: '24680',
    name: 'Product 3',
    price: 29.99,
    size: 'Large',
    dimension: '30x30x30cm'
  },
  {
    sku: '13579',
    name: 'Product 4',
    price: 39.99,
    size: 'Extra Large',
    dimension: '40x40x40cm'
  }
];

const ProductCard = ({ product }) => (
  <div className="card">
    <div className="card-body">
      <h5 className="card-title">{product.name}</h5>
      <p className="card-text">SKU: {product.sku}</p>
      <p className="card-text">Price: {product.price}</p>
      <p className="card-text">Size: {product.size}</p>
      <p className="card-text">Dimensions: {product.dimension}</p>
    </div>
  </div>
);

const ProductList = () => (
  <div className="row row-cols-4">
    {products.map(product => (
      <div className="col" key={product.sku}>
        <ProductCard product={product} />
      </div>
    ))}
  </div>
);

export default ProductList;
