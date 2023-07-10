import { createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartProviderProps = {
    children: React.ReactNode;
};

type CartItem = {
    id: number;
    quantity: number;
};

type ShoppingCartContextType = {
    getItemQuantity: (id: number) => number;
    increaseCartQuantity: (id: number) => void;
    decreaseCartQuantity: (id: number) => void;
    removeItemFromCart: (id: number) => void;

    openCart: () => void;
    closeCart: () => void;
    cartQuantity: number;
    cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
    return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    const [cartItems, setCartItems] = useState<CartItem[]>([]); //state to store cart items

    //variable for open and close cart
    const [isCartOpen, setIsCartOpen] = useState(false);

    //count total quantity of items in cart
    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0 //initial value of quantity
    ); //reduce cart items to get total quantity

    //function to open cart
    function openCart() {
        setIsCartOpen(true);
    }

    //function to close cart
    function closeCart() {
        setIsCartOpen(false);
    }

    function getItemQuantity(id: number) {
        return cartItems.find((item) => item.id === id)?.quantity ?? 0; //optional chaining operator //if item is not found, return 0
    }

    function increaseCartQuantity(id: number) {
        setCartItems((currentItems) => {
            if (currentItems.find((item) => item.id === id) == null) {
                //if id of item matches id of item in cart, return index of item in cart
                return [...currentItems, { id, quantity: 1 }]; //if item is not in cart, return our currentItems and add item to cart
            } else {
                return currentItems.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ); //if item is in cart, return currentItems and increase quantity of item by 1
            }
        });
    }

    //if we have more than 1 item in cart, decrease quantity by 1
    function decreaseCartQuantity(id: number) {
        setCartItems((currentItems) => {
            if (currentItems.find((item) => item.id === id)?.quantity == 1) {
                //if the quantity of the item is 1, remove item from cart
                return currentItems.filter((item) => item.id !== id); //return all items except the item with the id that matches the id of the item we want to remove
            } else {
                //if we have more than 1 item in cart, decrease quantity by 1
                return currentItems.map((item) =>
                    item.id === id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }
        });
    }

    function removeItemFromCart(id: number) {
        setCartItems(
            (currentItems) => currentItems.filter((item) => item.id !== id) //if item id matches id of item we want to remove, remove item from cart
        );
    }

    return (
        <ShoppingCartContext.Provider
            value={{
                getItemQuantity,
                increaseCartQuantity,
                decreaseCartQuantity,
                removeItemFromCart,
                openCart,
                closeCart,
                cartItems,
                cartQuantity,
            }}
        >
            {children}

            {/* if isCartOpen is true, show cart */}
            <ShoppingCart />
        </ShoppingCartContext.Provider>
    );
}
