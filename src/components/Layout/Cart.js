import React, { useContext, useEffect, useState } from "react";
import button from "../Layout/Cart.module.css";
import CartIcon from "../Cart/CartIcon";
import UserContext from "../../store/UserContext";

const Cart = (props) => {
  const a = useContext(UserContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const { items } = a;

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0); // items визначено за замовчуванням в UserContext. Reduce перетворить масив з даними в єдине значення


  const btnClasses = `${button.button} ${btnIsHighlighted ? button.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
        setBtnIsHighlighted(false)
    }, 300);
    return () => {
        clearTimeout(timer);
    };
  }, [items]); // додається клінап. Бо це хороша практика довати очистку після будь-якого таймерування
  

  // до цього було a.items.length в масиві депенденсіс. Але це 
  // нам не підходить, бо воно буде онвлюватись коли будь-яка зміна буде з a.
  // Тому ми використали деструктурування об'єкту, витягнули з a item та додали до length

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={button.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={button.badge}>{numberOfCartItems}</span>
    </button>
  );
}; //в button перше onClick, це вбудоване, не up to you.
//Коли тобі треба декілька класів пришпандьорити на один елемент то зберігай класи у змінну як тут btnClasses і в {} використовую вже цю змінну

export default Cart;
