import React from "react";
import AvaliableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";


const Meals = (props) => {
    return <React.Fragment>
        <MealsSummary />
        <AvaliableMeals />
    </React.Fragment>
};

export default Meals;