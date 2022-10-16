import React, { createContext, useState } from "react";

const CartContext = createContext({});

const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);

    const addProduct = (id, name, price, qty, urlImg) => {
        if (cartProducts.find(prod => prod.id === id) === undefined)
            setCartProducts((prevState) => [...prevState, { id: id, quantity: qty, name: name, price: price, urlImg: urlImg }]);
        else {
            let copyCartProducts = cartProducts;
            const idx = copyCartProducts.indexOf(copyCartProducts.find(prod => prod.id))
            copyCartProducts[idx]['quantity'] += qty
            setCartProducts(copyCartProducts);
        }
    }
    const removeProduct = (id) => {
        setCartProducts((prevState) => prevState.filter(prod => prod.id !== id))
    }
    const clearCart = () => {
        setCartProducts([])
    }
    const productsCount = () => {
        let items = 0;
        cartProducts.forEach(p => items += p.quantity);
        return items;
    }

    const context = {
        cartProducts,
        addProduct,
        removeProduct,
        clearCart,
        productsCount
    };

    return (
        <CartContext.Provider value={context}>{children}</CartContext.Provider>
    );
};

export { CartContext, CartProvider };
