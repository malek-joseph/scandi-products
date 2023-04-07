import React, { useState } from 'react';
import './ProductAdd.css'
import { useNavigate } from 'react-router-dom'
// import { addProduct } from '../api/add-product';
import axios from 'axios';

const AddProductForm = () => {
  const [product, setProduct] = useState({
    sku: '',
    name: '',
    price: '',
    productType: '',
    productTypeValue: '',
    size: '',
    height: '',
    width: '',
    length: '',
    weight: '',
  });

  const [errors, setErrors] = useState({
    sku: false,
    skuMissing: false,
    nameMissing: false,
    priceMissing: false,
    sizeMissing: false,
    weightMissing: false,
    heightMissing: false,
    widthMissing: false,
    lengthMissing: false,
    productTypeMissing: false,
  });

  const navigate = useNavigate()

  const handleProductTypeChange = (event) => {
    const value = event.target.value;
    setProduct((prevState) => ({ ...prevState, productType: value }));
  };

  const handleProductTypeValueChange = (event) => {
    const value = event.target.value;
    if (product.productType === 'dvd') {
      setProduct((prevState) => ({ ...prevState, size: value }));
    } else if (product.productType === 'furniture') {
      const inputId = event.target.id;
      if (inputId === 'height') {
        setProduct((prevState) => ({ ...prevState, height: value }));
      } else if (inputId === 'width') {
        setProduct((prevState) => ({ ...prevState, width: value }));
      } else if (inputId === 'length') {
        setProduct((prevState) => ({ ...prevState, length: value }));
      }
    } else if (product.productType === 'book') {
      setProduct((prevState) => ({ ...prevState, weight: value }));
    }
  };

  
  
//===========================================

// Without Conditionals

//===========================================
  const handleSubmit = (event) => {
    event.preventDefault();

    const productTypeValidation = {
      dvd: ['size'],
      furniture: ['length', 'width', 'height'],
      book: ['weight']
    };

    const requiredFields = ['sku', 'name', 'price', 'productType', ...(product.productType ? productTypeValidation[product.productType] || [] : [])];

    const newErrors = {
      sku: false,
      skuMissing: false,
      nameMissing: false,
      priceMissing: false,
      sizeMissing: false,
      weightMissing: false,
      heightMissing: false,
      widthMissing: false,
      lengthMissing: false,
      productTypeMissing: false,
    };

    for (const field of requiredFields) {
      if (!product[field]) {
        newErrors[field + "Missing"] = true;
      }
    }

    setErrors(newErrors);

    if (Object.values(newErrors).includes(true)) {
      alert('All fields are required');
      return;
    }

    let dimensions = product.height ? `${product.height}*${product.width}*${product.length}` : 0;

    axios.post('http://localhost:8002/api/add-product', { sku: product.sku, name: product.name, price: product.price, size: product.size || 0, weight: product.weight || 0, dimensions: dimensions || 0 })
      .then((res) => {
        setErrors({
          sku: false,
          skuMissing: false,
          nameMissing: false,
          priceMissing: false,
          sizeMissing: false,
          weightMissing: false,
          heightMissing: false,
          widthMissing: false,
          lengthMissing: false,
          productTypeMissing: false,
        });
        setProduct({
          sku: '',
          name: '',
          price: '',
          productType: '',
          productTypeValue: '',
          size: '',
          height: '',
          width: '',
          length: '',
          weight: '',
        });
        navigate('/', { replace: true })

      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 400) {
          setErrors({
            ...newErrors,
            sku: true,
          });
        }
      });
  };



//===========================================

// With Conditionals

//===========================================

   
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const productTypeValidation = {
//       dvd: (product) => !!product.size,
//       furniture: (product) => !!product.height && !!product.width && !!product.length,
//       book: (product) => !!product.weight
//     };

//     let dimensions = product.height ? `${product.height}*${product.width}*${product.length}` : 0
//     const allFieldsFilled = () => {
//       let errors = {};

//       if (!product.sku) {
//         errors.skuMissing = true;
//       }
//       if (!product.price) {
//         errors.priceMissing = true;
//       }
//       if (!product.name) {
//         errors.nameMissing = true;
//       }

//       if (product.productType === 'dvd' && !product.size) {
//         errors.sizeMissing = true;
//       } else if (product.productType === 'furniture') {
//         if (!product.height) {
//           errors.heightMissing = true;
//         }
//         if (!product.width) {
//           errors.widthMissing = true;
//         }
//         if (!product.length) {
//           errors.lengthMissing = true;
//         }
//       } else if (product.productType === 'book' && !product.weight) {
//         errors.weightMissing = true;
//       }

//       setErrors(errors);

//       return Object.keys(errors).length === 0;
//     };

// //===========================================

//     console.log(allFieldsFilled());
//     if (allFieldsFilled()) {
//       axios.post('http://localhost:8002/api/add-product', { sku: product.sku, name: product.name, price: product.price, size: product.size ? product.size : 0, weight: product.weight ? product.weight : 0, dimensions: dimensions ? `${product.height}*${product.width}*${product.length}` : 0 })
//         .then((res) => {
//           setErrors({});
//           setProduct({
//             sku: '',
//             name: '',
//             price: '',
//             productType: '',
//             productTypeValue: '',
//             size: '',
//             height: '',
//             width: '',
//             length: '',
//             weight: '',
//           });
//           navigate('/', { replace: true })

//         })
//         .catch((error) => {
          
//           console.log(error);
//           if (error.response && error.response.status === 400) {
//             setErrors({
//               ...errors,
//               sku: 'SKU already exists',
//             });
//             console.log('duplicate error', errors.sku);

//           }
//         });
//     } else {
//       console.log(allFieldsFilled());
//       console.log(product.sku, product.price, product.name, product.productType, product.size, product.height, product.weight, product.width, product.weight);
//       alert('All fields are required')
//     }
//   };


  const handleCancel = (event) => {
    event.preventDefault();
    setProduct({
      sku: '',
      name: '',
      price: '',
      productType: '',
      productTypeValue: '',
      size: '',
      height: '',
      width: '',
      length: '',
      weight: '',
    });
    navigate('/', { replace: true });
  };
  const handleChange = (event) => {
    const { id, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [id]: value,
    }));
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
          <input type="text" className={`form-control ${errors.sku || errors.skuMissing ? 'is-invalid' : ''}`} id="sku" value={product.sku} onChange={handleChange} />
          {errors.sku && <div className="invalid-feedback">SKU already exists</div>}
          {errors.skuMissing && <div className="invalid-feedback">Please enter a SKU</div>}
        </div>
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input type="text" className={`form-control ${errors.nameMissing ? 'is-invalid' : ''}`} id="name" value={product.name} onChange={handleChange} />
          {errors.nameMissing && <div className="invalid-feedback">Please enter a product name</div>}
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input type="number" className={`form-control ${errors.priceMissing ? 'is-invalid' : ''}`} id="price" value={product.price} onChange={handleChange} />
          {errors.priceMissing && <div className="invalid-feedback">Please enter a price</div>}
        </div>
        <div className="form-group">
          <label htmlFor="productTypeInput">Type:</label>
          <select className="form-control" id="productType" value={product.productType} onChange={handleProductTypeChange}>
            <option value="">Select a type</option>
            <option id='DVD' value="dvd">DVD</option>
            <option id='Furniture' value="furniture">Furniture</option>
            <option id='Book' value="book">Book</option>
          </select>
          {errors.productTypeMissing && !product.productType && <div className="alert alert-danger alert-thin" role="alert">
            The product Type is missing
          </div>}
        </div>
        {product.productType === 'dvd' && (
          <>
            <p className='m-2 small'>Please provide the DVD size in Megabytes.</p>
            <div className="form-group">
              <label htmlFor="sizeInput">Size (MB)</label>
              <input type="text" className="form-control" id="size" value={product.size} onChange={handleProductTypeValueChange} />
              {errors.sizeMissing && !product.size && <div className="alert alert-danger alert-thin" role="alert">
                The size is missing
              </div>}
            </div>
          </>
        )}
        {product.productType === 'furniture' && (
          <>
            {/* {toast.info('Please provide dimensions in HxWxL format')} */}
            <p className='m-2 small'>Please provide dimensions in HxWxL format.</p>
            <div className="form-group">
              <label htmlFor="heightInput">Height (CM)</label>
              <input type="text" className="form-control" id="height" value={product.height} onChange={handleProductTypeValueChange} />
              {errors.heightMissing && !product.height && <div className="alert alert-danger alert-thin" role="alert">
                The height is missing
              </div>}
            </div>
            <div className="form-group">
              <label htmlFor="widthInput">Width (CM)</label>
              <input type="text" className="form-control" id="width" value={product.width} onChange={handleProductTypeValueChange} />
              {errors.widthMissing && !product.width && <div className="alert alert-danger alert-thin" role="alert">
                The width is missing
              </div>}
            </div>
            <div className="form-group">
              <label htmlFor="lengthInput">length (CM)</label>
              <input type="text" className="form-control" id="length" value={product.length} onChange={(event) =>
              setProduct((prevState) => ({...prevState, length: event.target.value }))
              } />
              {errors.lengthMissing && !product.length && <div className="alert alert-danger alert-thin" role="alert">
                The length is missing
              </div>}
            </div>
          </>)}
        {product.productType === 'book' && (
          <>
            <p className='m-2 small'>Please provide the Book weight in Kilograms.</p>

            <div className="form-group">
              <label htmlFor="weight">Weight (KG):</label>
              <input type="text" className="form-control" id="weight" value={product.weight} onChange={(event) => 
              setProduct((prevState) => ({...prevState, weight: event.target.value }))} />
              {errors.weightMissing && !product.weight && <div className="alert alert-danger alert-thin" role="alert">
                The weigth is missing
              </div>}
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