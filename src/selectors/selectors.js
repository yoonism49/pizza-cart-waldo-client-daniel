import { createSelector } from 'reselect';

export const getPizzas = state => state.get('pizzas');

export const getPizzaList = createSelector(
  getPizzas,
  pizzas => pizzas.get('pizzaSizes')
);

