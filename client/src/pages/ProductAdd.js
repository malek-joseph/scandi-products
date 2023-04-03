import React, { useState } from 'react';
import { toast } from "react-toastify";
import './ProductAdd.css'
import { useNavigate } from 'react-router-dom'
// import { addProduct } from '../api/add-product';
import axios from 'axios';




const AddProductForm = () => {
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [productType, setProductType] = useState('');
  const [productTypeValue, setProductTypeValue] = useState('');
  const [size, setSize] = useState('');
  const [height, setHeight] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [weight, setWeight] = useState('');
  const navigate = useNavigate()


  const handleProductTypeChange = (event) => {
    setProductType(event.target.value);
    setProductTypeValue('');
    setSize('');
    setHeight('');
    setWidth(''); 
    setLength('');
    setWeight('');
  };

  const handleProductTypeValueChange = (event) => {
    setProductTypeValue(event.target.value);
  };

  const handleSubmit =  (event) => {
    event.preventDefault();
    let dimensions = height ? `${height}*${width}*${length}` : 0
    axios.post('http://localhost:8002/api/add-product', { sku, name, price, size: size ? size : 0, weight: weight?weight: 0, dimensions: dimensions? dimensions:0 })
      .then(res => {
        console.log("success", res)
        setSku('')
        setName('')
        setPrice('')
        setSize('')
        setWidth('')
        setHeight('')
        setWeight('')
        setProductType('')
        setProductTypeValue('')
        navigate('/', {replace: true})

      })
    .catch(err => console.log(err.response))

      
  };


  const handleCancel = (event) => {

    event.preventDefault();
    setSku('')
    setName('')
    setPrice('')
    setProductType('')
    setProductTypeValue('')
    setSize('')
    setHeight('')
    setWidth('')
    setLength('')
    setWeight('')
    navigate('/', { replace: true })

    
  };

  return (
    <>

      <form id="product_form" onSubmit={handleSubmit} className="container my-4 " style={{ paddingBottom: '20%' }}>

        <div className="row sticky-top p-3">
          <div className="col-6">
            <h2>Product Add</h2>
          </div>
          <div className="col-6 d-flex justify-content-end align-items-center">
            <div className="form-group">
              <button type="submit" className="btn btn-primary me-2">Save</button>
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </div>
          </div>

        </div>
        <hr className='mt-3' />


        <div className="form-group mt-3">
          <label htmlFor="skuInput" >SKU:</label>
          <input type="text" className="form-control" id="sku" value={sku} onChange={(event) => setSku(event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="nameInput" >Name:</label>
          <input type="text" className="form-control" id="name" value={name} onChange={(event) => setName(event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="priceInput" >Price:</label>
          <input type="text" className="form-control" id="price" value={price} onChange={(event) => setPrice(event.target.value)} />
        </div>

        <div className="form-group">
          <label htmlFor="productTypeInput">Type:</label>
          <select className="form-control" id="productType" value={productType} onChange={handleProductTypeChange}>
            <option value="">Select a type</option>
            <option id='DVD' value="dvd">DVD</option>
            <option id='Furniture' value="furniture">Furniture</option>
            <option id='Book' value="book">Book</option>
          </select>
        </div>

        {productType === 'dvd' && (

          <>
            <p className='m-2 small'>Please provide the DVD size in Megabytes.</p>

            <div className="form-group">
              <label htmlFor="sizeInput">Size (MB)</label>
              <input type="text" className="form-control" id="size" value={productTypeValue} onChange={handleProductTypeValueChange} />
            </div>
          
          </>

        )}

        {productType === 'furniture' && (

          <>
            {/* {toast.info('Please provide dimensions in HxWxL format')} */}
            <p className='m-2 small'>Please provide dimensions in HxWxL format.</p>
            <div className="form-group">
              <label htmlFor="heightInput">Height (CM)</label>
              <input type="text" className="form-control" id="height" value={height} onChange={(event) => setHeight(event.target.value)} />
            </div>

            <div className="form-group">
              <label htmlFor="widthInput">Width (CM)</label>
              <input type="text" className="form-control" id="width" value={width} onChange={(event) =>
                setWidth(event.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="lengthInput">length (CM)</label>
              <input type="text" className="form-control" id="length" value={length} onChange={(event) =>
                setLength(event.target.value)} />
            </div>
          </>)}
        {productType === 'book' && (
          <>
            <p className='m-2 small'>Please provide the Book weight in Kilograms.</p>

            <div className="form-group">
              <label htmlFor="weight">Weight (KG):</label>
              <input type="text" className="form-control" id="weight" value={weight} onChange={(event) => setWeight(event.target.value)} />
            </div>

          </>)}
 



      </form>
      <div className="fixed-bottom bg-light d-flex align-items-center justify-content-center" style={{ height: '20%' }}>
        <hr style={{ borderTop: '1px solid #ddd' }} />
        <br />
        <p className="text-muted text-center" style={{ fontSize: '0.8rem' }}>Scandiweb Test Assignment</p>
      </div>

    </>
  )
}

export default AddProductForm