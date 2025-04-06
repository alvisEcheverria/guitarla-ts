import { useEffect, useState, useMemo } from 'react';
import { db } from '../data/db';
import type { Guitar, CartItem, CartContext } from "../types";

export const useCart = (): CartContext => {
    
    const [ data ] = useState<Guitar[]>(db);
    const [ cart, setCart ] = useState<CartItem[]>(getStoredCart);
    console.log(getStoredCart())
    function getStoredCart(){
      const storedCart = localStorage.getItem("cart");
      return storedCart? JSON.parse(storedCart) : [];
    };
  
    useEffect(()=> {
      localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart])
  
    const MAX_QUANTITY = 5;
    const MIN_QUANTITY = 0;
  
    const addToCart = (item: Guitar) => {
      const itemExists = cart.findIndex((element: CartItem) => element.id === item.id);
  
      if(itemExists >= 0){
        if(cart[itemExists].quantity >= MAX_QUANTITY) return;
        const updatedCart = [...cart];
        updatedCart[itemExists].quantity++;
        setCart(updatedCart);
      } else {
        const newItem: CartItem = {...item, quantity: 1};
        setCart([...cart, newItem]);
      }
    };
  
    const removeFromCart = (itemId : Guitar["id"])  => {  
      const updatedCart = cart.filter((item: CartItem) => item.id !== itemId);
      setCart(updatedCart);
    };
  
    const increaseQuantity = (itemId : Guitar["id"])  => {
      const updatedCart = cart.map((item: CartItem) => {
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
  
    const decreaseQuantity = (itemId : Guitar["id"]) => {
      const updatedCart = cart.map((item: CartItem) => {
        if(item.id === itemId){
          return {
            ...item,
            quantity: item.quantity - 1
          };
        } 
        return item;
      });
      const filteredCart = updatedCart.filter((cart : CartItem) => cart.quantity > MIN_QUANTITY);
      setCart(filteredCart);
    };
  
    const emptyCart = ()=> setCart([]);

    const isEmpty = useMemo(()=> cart.length === 0, [cart]);
    const cartTotal = useMemo(()=> cart.reduce((acc: number, item: CartItem) => acc + (item.price * item.quantity), 0), [cart]); 

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