import React, { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

export const CartContainer = () => {
    const { cartProducts } = useContext(CartContext);
    
    return <div>
        {cartProducts?.map(item => {
            return (
                <div>{item.name} -- { item. quantity}</div>
            )
        })}
    </div>;
};
