import React, { useContext, useState } from "react";
import classes from "../Cart/Cart.module.css";
import Modal from "./Modal";
import UserContext from "../../store/UserContext";
import CartItem from "../Cart/CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const ctx = useContext(UserContext);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

 const submitOrderHandler = async(userData)  => {
    setIsSubmitting(true);
    await fetch('https://react-food-order-app-6e012-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItem: ctx.items,
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    ctx.clearCart()
  } 

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  ); // створили тег невпорядкований список в середині якого помістили {}, в середині яких в нас був код-масив
  // додали bind щоб 100% прив'язатися до cartItemRemoveHandler та cartItemAddHandler, null не використовується
  // <Button onClick={() => removeItemHandler(id)}> ... </Button> або використати анонімну funct

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHide}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
<React.Fragment>
    {cartItems}
      <div className={classes.total}>
        <span>Total amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHide}/>}
      {!isCheckout && modalActions}
      </React.Fragment>
  )

  const isSubmittingModalContent = <p>Sending order data...</p>
  const didSubmitModalContent = <p>Successfully sent the order!</p>

  return (
    <Modal onHide={props.onHide}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  ); // тобто відображати кнопку Ордер тільки якщо є продукти в корзині
}; // в checkout onCancel продублювали поведінку як і в close

export default Cart;

// прибрала bind та використала анонім функцію. Тож ми або ставимо ()=>, щоб відкласти виконання до події onClick, або використовуємо прив’язку як спосіб прив’язування певного параметра елемента (наприклад, суші чи барбекю) до певних функцій компонента , знову ж таки, без запуску функції до події onClick
// в цьому прикладі добре показано як винести JSX код в окрему змінну
