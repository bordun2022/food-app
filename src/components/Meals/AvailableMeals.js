import React, { useEffect, useState } from "react";
import classes from "../Meals/Available.module.css";
import Card from "../UI/Card";
import MealsItem from "./MealsItem";

const AvaliableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        "https://react-food-order-app-6e012-default-rtdb.europe-west1.firebasedatabase.app/meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!"); // це і є message в error.me
      }
      const responseData = await response.json(); // повертає об'єкт, нам треба масив

      const loadedMeals = [];
      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    }; // з [key], бо нам треба доступ до вкладених в масив даних бо наші дані в key

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.mealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.mealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealsItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  )); // при написанні списків маємо додавати атрибут key, name, desription, price. Як альтернатива, щоб не писати атрибути name, desription, price^
  // можна додати один - meal={meal}, а в файлі MealsItem писати не props.description, а props.meal.description і так щодо кожного атрибуту

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvaliableMeals;
