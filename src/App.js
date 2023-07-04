import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {

  const[cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  return (
    <CartProvider>
      {cartIsShown && <Cart onHide={hideCartHandler} />}
      <Header onClick={showCartHandler} />
      <main>
      <Meals />
      </main>
    </CartProvider>
  ); // або можна писати import { Fragment } from 'react' та робити посилання <Fragment></Fragment>
}

export default App;
