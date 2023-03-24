// import './App.css';
import { Route, Routes } from 'react-router-dom'
import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ProductAdd from './pages/ProductAdd'; 
import ProductList from './pages/ProductList';
import Test from './pages/Test';
// import Footer from './components/Footer';



const App = () => {


  return (
    <>
      {/* The toast container shows the client a notification with a message of our own */}
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/add-product" element={<ProductAdd />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      {/* <Footer /> */}

    </>

  );
}

export default App;