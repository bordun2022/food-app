import React from 'react';
import classes from '../Layout/Header.module.css'; // модульний підхід до відображення css-файлу
import img from '../../assets/meals.jpeg'
import Cart from './Cart';

const Header = (props) => {
    return <React.Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <Cart onClick={props.onClick}/>
        </header>
        <div className={classes['main-image']}>
            <img src={img} alt = 'A table full of delicius food!' />
        </div>
    </React.Fragment>
}; // посилання в className робимо на конкретний файл, який нас цікавить
// посилання на назву класу, яке містить дефіс, як в main-image робимо з
// квадратними дужками, як в div

export default Header;