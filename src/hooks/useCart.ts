import { useEffect, useState, useMemo } from 'react';
import { db } from '../data/db';

export const useCart = () => {
    
    const [ data ] = useState(db);
    const [ cart, setCart ] = useState(getStoredCart);
  
    function getStoredCart(){
      const storedCart = localStorage.getItem("cart");
      return storedCart? JSON.parse(storedCart) : [];
    };
  
    useEffect(()=> {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])
  
    const MAX_QUANTITY = 5;
    const MIN_QUANTITY = 0;
  
    const addToCart = (item) => {
      const itemExists = cart.findIndex(i => i.id === item.id);
  
      if(itemExists >= 0){
        if(cart[itemExists].quantity >= MAX_QUANTITY) return;
        const updatedCart = [...cart];
        updatedCart[itemExists].quantity++;
        setCart(updatedCart);
      } else {
        item.quantity = 1;
        setCart(prevCart => [...prevCart, item]);
      }
    };
  
    const removeFromCart = itemId => {  
      const updatedCart = cart.filter(item => item.id !== itemId);
      
      setCart(updatedCart);
    };
  
    const increaseQuantity = itemId => {
      const updatedCart = cart.map(item => {
        if(item.id === itemId && item.quantity < MAX_QUANTITY){
          return {
            ...item,
            quantity: item.quantity + 1 
          };
        }
          return item;
      });
      setCart(updatedCart);
    };
  
    const decreaseQuantity = itemId => {
      const updatedCart = cart.map(item => {
        if(item.id === itemId){
          return {
            ...item,
            quantity: item.quantity - 1
          };
        } 
        return item;
      });
      const filteredCart = updatedCart.filter(cart => cart.quantity > MIN_QUANTITY);
      setCart(filteredCart);
    };
  
    const emptyCart = ()=> setCart([]);

    const isEmpty = useMemo(()=> cart.length === 0, [cart]);
    const cartTotal = useMemo(()=> cart.reduce((acc, item)=> acc + (item.price * item.quantity), 0), [cart]); 

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        emptyCart,
        isEmpty,
        cartTotal
    }
};