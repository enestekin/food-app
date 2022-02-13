import React, { useState, useEffect } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import styles from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch(
          'https://react-http-c3db1-default-rtdb.firebaseio.com/meals.json'
        );

        if (!response.ok) {
          throw new Error('Something went wrong');
        }

        const responseData = await response.json();

        const loadedMeals = [];

        for (const key in responseData) {
          loadedMeals.push({
            id: key,
            description: responseData[key].description,
            name: responseData[key].name,
            price: responseData[key].price,
          });
        }
        setMeals(loadedMeals);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMeals();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (isLoading) {
    return (
      <section className={styles.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
