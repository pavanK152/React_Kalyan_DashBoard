import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import Login from "../components/forms/Login";
import Register from "../components/forms/Register";
import AddFirm from "../components/forms/AddFirm";
import AddProduct from "../components/forms/AddProduct";
import Welcome from "../components/Welcome";
import AllProducts from "../components/AllProducts";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showFirm, setShowFirm] = useState(false);
  const [showProduct, setShowProduct] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const [showFirmTitle, setShowFirmTitle] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      setShowLogOut(true);
      setShowWelcome(true);
    }
  }, []);

  const logOutHandler = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("vendorId");
    localStorage.removeItem("firmId");
    localStorage.removeItem("firmName");

    setShowLogOut(false);
    setShowLogin(false);
    setShowRegister(false);
    setShowWelcome(true);
    setShowFirm(false);
    setShowProduct(false);
    setShowAllProducts(false);
  };

  const showLoginHandler = () => {
    setShowLogin(true);
    setShowRegister(false);
    setShowWelcome(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowAllProducts(false);
  };

  const showRegisterHandler = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowWelcome(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowAllProducts(false);
  };

  const showFirmHandler = () => {
    if (showLogOut) {
      setShowFirm(true);
      setShowProduct(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert("Please Login");
      setShowLogin(true);
    }
  };

  const showProductHandler = () => {
    if (showLogOut) {
      setShowProduct(true);
      setShowFirm(false);
      setShowWelcome(false);
      setShowAllProducts(false);
    } else {
      alert("Please Login");
      setShowLogin(true);
    }
  };

  const showAllProductsHandler = () => {
    if (showLogOut) {
      setShowAllProducts(true);
      setShowFirm(false);
      setShowProduct(false);
      setShowWelcome(false);
    } else {
      alert("Please Login");
      setShowLogin(true);
    }
  };

  const showWelcomeHandler = (loggedIn = false) => {
    setShowWelcome(true);
    setShowLogin(false);
    setShowRegister(false);
    setShowFirm(false);
    setShowProduct(false);
    setShowAllProducts(false);

    // 🔑 SYNC LOGIN STATE
    if (loggedIn) {
      setShowLogOut(true);
    }
  };

  return (
    <section className="landingSection">
      <Navbar
        showLoginHandler={showLoginHandler}
        showRegisterHandler={showRegisterHandler}
        showLogOut={showLogOut}
        logOutHandler={logOutHandler}
      />

      <div className="collectionSection">
        <SideBar
          showFirmHandler={showFirmHandler}
          showProductHandler={showProductHandler}
          showAllProductsHandler={showAllProductsHandler}
          showFirmTitle={showFirmTitle}
        />

        {showWelcome && <Welcome />}
        {showLogin && <Login showWelcomeHandler={showWelcomeHandler} />}
        {showRegister && <Register showLoginHandler={showLoginHandler} />}
        {showFirm && <AddFirm />}
        {showProduct && <AddProduct />}
        {showAllProducts && <AllProducts />}
      </div>
    </section>
  );
};

export default LandingPage;
