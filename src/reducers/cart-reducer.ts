import { db } from "../data/db";
import { CartItem, Guitar } from "../types";

export type CartActions = 
    { type: "add-to-cart", payload: Guitar } |
    { type: "remove-from-cart", payload: Guitar["id"]} |
    { type: "increase-quantity", payload: Guitar["id"] } |
    { type: "decrease-quantity", payload: Guitar["id"] } |
    { type: "empty-cart" }

export type CartState = {
    data: Guitar[];
    cart: CartItem[];
};

export const initialState: CartState = {
    data: db, 
    cart: []
};

export const cartReducer = (
        state: CartState = initialState,
        action: CartActions
    ) => {

    switch(action.type) {
        case "add-to-cart":

            return {
                ...state
            };

        case "remove-from-cart":

            return {
                ...state
            };

        case "increase-quantity":

            return {
                ...state
            };

        case "decrease-quantity":
            return {
                ...state
            };
            
        case "empty-cart":

            return {
                ...state
            }

        default:
            return state
    }
};