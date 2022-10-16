import React, { useState, useContext } from "react";
import { createStyles, Badge, Button } from "@mantine/core";
import { ItemCount } from "./ItemCount";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const useStyles = createStyles((theme) => ({
    layout: {
        margin: "32px",
        display: "flex",
        flexDirection: "column",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "32px",
        width: "160px",
        alignSelf: "flex-start",
    },
}));

export const ItemDetail = ({
    id,
    name,
    price,
    stock,
    description,
    discount,
    urlImg
}) => {
    const { classes } = useStyles();
    const [showItemCount, setShowItemCount] = useState(true);

    const { addProduct } = useContext(CartContext);
    
    const addItemsToCart = (count) => {
        addProduct(id, name, price, count, urlImg);
        setShowItemCount(false);
    };

    return (
        <div className={classes.layout}>
            <h1>{name}</h1>
            <div className={classes.row}>
                <h2>$ {price}</h2>
                {discount > 0 && <Badge variant="outline">-{discount}%</Badge>}
            </div>
            <p>{description}</p>
            <p>Artículos restantes: {stock}</p>

            <div
                className={classes.row}
                style={{ margin: "32px", alignSelf: "center" }}
            >
                {showItemCount ? (
                    <ItemCount stock={stock} addItemsToCart={addItemsToCart} />
                ) : (
                    <Link to={`/cart`}>
                        <Button
                            variant="gradient"
                            gradient={{
                                from: "#810000",
                                to: "#690000",
                                deg: 35,
                            }}
                            size="md"
                        >
                            Ir al carrito
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    );
};
