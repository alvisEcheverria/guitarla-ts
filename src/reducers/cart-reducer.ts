import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions = 
    { type: "add-to-cart", payload: { item: Guitar } } |
    { type: "remove-from-cart", payload: { id: Guitar["id"] }} |
    { type: "increase-quantity", payload: { id: Guitar["id"] } } |
    { type: "decrease-quantity", payload: { id: Guitar["id"] } } |
    { type: "empty-cart" }

export type CartState = {
    data: Guitar[];
    cart: CartItem[];
};

function getStoredCart(){
    const storedCart = localStorage.getItem("cart");
    return storedCart? JSON.parse(storedCart) : [];
};

export const initialState: CartState = {
    data: db, 
    cart: getStoredCart()
};

const MAX_QUANTITY: number = 5;
const MIN_QUANTITY:number = 1;

export const cartReducer = (
        state: CartState = initialState,
        action: CartActions
    ) => {

    switch(action.type) {
        case "add-to-cart": {

            const itemExists = state.cart.find((element: CartItem) => element.id === action.payload.item.id);

            let updatedCart: CartItem[] = [];

            if (itemExists) {
                updatedCart = state.cart.map(item => {
                    if(item.id === action.payload.item.id){
                        if(item.quantity < MAX_QUANTITY){
                            return {...item, quantity: item.quantity + 1}
                        }
                        else {
                            return item
                        }
                    }
                    else {
                        return item
                    }
                })
            } else {
                const newItem: CartItem = {...action.payload.item, quantity: 1}
                updatedCart = [...state.cart, newItem] 
            }

            return {
                ...state,
                cart: updatedCart
            };
        }
        case "remove-from-cart":
    
            return {
                ...state,
                cart: state.cart.filter((item: CartItem) => item.id !== action.payload.id)
            };
 
        case "increase-quantity": {
            const updatedCartIncrease: CartItem[] = state.cart.map((item: CartItem) => {
                if(item.id === action.payload.id && item.quantity < MAX_QUANTITY){
                    return {
                        ...item,
                        quantity: item.quantity + 1 
                    };
                }
                return item;
            })

            return {
                ...state,
                cart: updatedCartIncrease
            };
        }
        case "decrease-quantity": {
            const updatedCartDecrease: CartItem[] = state.cart.map((item: CartItem) => {
                if(item.id === action.payload.id && item.quantity > MIN_QUANTITY){
                    return {
                        ...item,
                        quantity: item.quantity - 1 
                    };
                }
                return item;
            })

            return {
                ...state,
                cart: updatedCartDecrease
            };
        }
        case "empty-cart":

            return {
                ...state,
                cart: []
            }

        default:
            return state
    }
};