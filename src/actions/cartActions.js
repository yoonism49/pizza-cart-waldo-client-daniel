export function addToCart(item) {
  return {
      type: 'ADD',
      payload: item
  };
}

export function removeFromCart(item) {
  return {
      type: 'REMOVE',
      payload: item
  };
}
export function changeCart(item) {
  return {
      type: 'CHANGE',
      payload: item
  };
}