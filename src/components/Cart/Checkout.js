import classes from "./Checkout.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isNotFive = (value) => value.trim().length !== 5;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredNameValue = nameInputRef.current.value;
    const enteredStreetValue = streetInputRef.current.value;
    const enteredPostalValue = postalInputRef.current.value;
    const enteredCityValue = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredNameValue);
    const enteredStreetIsValid = !isEmpty(enteredStreetValue);
    const enteredPostalIsValid = !isNotFive(enteredPostalValue);
    const enteredCityIsValid = !isEmpty(enteredCityValue);

    setFormInputsValidity({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        postalCode: enteredPostalIsValid,
        city: enteredCityIsValid
    })

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredPostalIsValid &&
      enteredCityIsValid;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
        name: enteredNameValue,
        street: enteredStreetValue,
        postalCode: enteredPostalValue,
        city: enteredCityValue
    })

    nameInputRef.current.value = "";
    streetInputRef.current.value = "";
    postalInputRef.current.value = "";
    cityInputRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
        <label htmlFor="name">Your Name</label>
        <input ref={nameInputRef} type="text" id="name" />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
        <label htmlFor="street">Street</label>
        <input ref={streetInputRef} type="text" id="street" />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.postalCode ? '' : classes.invalid}`}>
        <label htmlFor="postal">Postal code</label>
        <input ref={postalInputRef} type="text" id="postal" />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
        <label htmlFor="city">City</label>
        <input ref={cityInputRef} type="text" id="city" />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button className={classes.submit}>Confirm</button>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
      </div>
    </form>
  ); // додаємо тип кнопки button, що таким чином вона не зможе submit the form. Тільки confirm button може
};

export default Checkout;
