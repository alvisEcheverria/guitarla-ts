export type Guitar = {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
}

export type CartItem = Guitar & {
    quantity: number;
}

export type CartContext = {
    data: Guitar[];
    cart: CartItem[];
    addToCart: (item: Guitar) => void;
    removeFromCart: (item : Guitar["id"]) => void;
    increaseQuantity: (item: Guitar["id"]) => void;
    decreaseQuantity: (item: Guitar["id"]) => void;
    emptyCart: () => void;
    isEmpty: boolean;
    cartTotal: number;
}
