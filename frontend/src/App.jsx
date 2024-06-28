import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductsList from "./components/ProductsList";
import SignUser from "./Pages/SignUser";
import { AmazonProvider } from "./contexts/AmazonContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";

function App() {
  return (
    <Router>
      <AmazonProvider>
        <NavBar />
        <Routes>
          <Route path="/" Component={HomePage} />
          <Route path="/:category" Component={ProductsList} />
          <Route path="/products/:productId" Component={ProductDetails} />
          <Route path="/signUser" Component={SignUser} />
          <Route path="/cart" Component={Cart} />
        </Routes>
        <Footer />
      </AmazonProvider>
    </Router>
  );
}

export default App;
