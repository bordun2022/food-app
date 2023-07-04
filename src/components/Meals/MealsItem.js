import { useContext } from "react";
import UserContext from '../../store/UserContext'
import classes from "../Meals/MealsItem.module.css";
import MealsForm from "./MealsForm";

const MealsItem = (props) => {
  const v = useContext(UserContext)
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
   v.addItem({
  id: props.id,
  name: props.name,
  amount: amount,
  price: props.price
});
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealsForm id={props.id} onAddToCart={addToCartHandler}/>
      </div>
    </li>
  );
};

export default MealsItem;
