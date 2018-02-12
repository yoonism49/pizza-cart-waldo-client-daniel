import defaultState from './defaultState';
const pizza = (state = defaultState.pizzaSizes, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    case 'REMOVE':
      return state - action.payload;
    case 'CHANGE':
        return state = action.payload;
    default:
      return state
  }
}

export default pizza;
