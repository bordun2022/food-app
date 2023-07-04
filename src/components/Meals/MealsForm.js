import classes from "../Meals/MealsForm.module.css";
import { useRef, useState } from "react";
import Input from "../UI/Input";

const MealsForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault(); // викликається для того, щоб переконатися, що у браузері перезавантаження сторінки за замовчуванням - заборонено

    const enteredAmount = amountInputRef.current.value; // це value завжди string, тому далі робимо конвертацію
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 5
    ) {
      setAmountIsValid(false)
      return;
  }
   props.onAddToCart(enteredAmountNumber)
};
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount!</p>}
    </form>
  );
}; // input як JSX код приймає об'єкт з key-value pairs. id, type, min, max, step, defaultValue
// це атрибути вбудовані, які можна додати в будь-який інпутс

export default MealsForm;
