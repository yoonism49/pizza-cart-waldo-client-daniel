import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addToCart, removeFromCart } from '../actions/cartActions';
import {
 gql,
 graphql
} from 'react-apollo';
import {createStore} from 'redux';
import pizza from '../reducers/pizzaReducer';
class PizzaList extends Component {
  constructor(props) {
    super(props);
    this.state = {
     size:[],
     checked:[]
    };
    this.store = null;
  }
  componentWillMount() {
   const {data} = this.props;
   this.store = createStore(pizza);
   if (data.loading) {
     return <p>Loading ...</p>;
   }
   if (data.error) {
     return <p>{data.error.message}</p>;
   }
   // createPizzaList(data.pizzaSizes);
  }
  
  setSize(index, obj) {
    if(!this.state.size[index]) {
      this.store.dispatch(addToCart(obj.toppings[0].pizzaSize.basePrice));
    } else {
      this.store.dispatch(removeFromCart(obj.toppings[0].pizzaSize.basePrice));
    }
    let checkboxValue = this.state.size;
    checkboxValue[index] = !this.state.size[index];
    this.setState({size: checkboxValue});
  }
  handleCheck(index, item) {
    console.log('handleCheck');
    if(!this.state.checked[index]) {
      this.store.dispatch(addToCart(item.topping.price));
    } else {
      this.store.dispatch(removeFromCart(item.topping.price));
    }
    let checkboxValue = this.state.checked;
    checkboxValue[index] = !this.state.checked[index];
    this.setState({checked: checkboxValue});
  }
  render() {

    const {data} = this.props;
    const state = this.store.getState();
    return <div><h1>PIZZA SIZE</h1><div>
      { data.pizzaSizes && data.pizzaSizes.map( (ch, index) => <div key={ch.name}><input type="checkbox" onChange={this.setSize.bind(this,index, ch)}/>{ch.name} {ch.price}</div>)}
    </div>
    <h1>Toppings</h1>
      { data.pizzaSizes && data.pizzaSizes[0].toppings.map( (ch, index) => <div key={ch.topping.name}><input type="checkbox" onChange={this.handleCheck.bind(this,index, ch)} defaultChecked={this.state.checked[index]}/> {ch.topping.name} {ch.topping.price}</div> ) }
      <h1>Cart</h1>
      <h2>Total : { state.toFixed(2) }</h2>
     </div>;
  }
 };

PizzaList.propTypes = {
  data: PropTypes.object,
  pizzaSizes: PropTypes.number
};

 const pizzaQuery = gql`
  query {
  pizzaSizes {
    name,
    maxToppings,
    toppings{
      pizzaSize {
        name
        maxToppings
        basePrice
      },
      topping {
        name
        price
      },
      defaultSelected
    }
  }
}`;
const PizzaListWithData = graphql(pizzaQuery)(PizzaList);
const mapStateToProps = store => {
  return {
    pizzaSizes: store.pizzaSizes
  }
}
export default connect(mapStateToProps)(PizzaListWithData);