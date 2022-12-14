import React, { useState } from "react";
import { createStyles, Button } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    itemCountLayout: {
        display: "flex",
        flexDirection: "column"
    },
    itemCountButtonContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "4px"
    },
    itemCountButton: {
        backgroundColor: "#810000",
        color: "#FFF",
        borderRadius: "50%",
        width: "24px",
        height: "24px",
        border: "none",
        cursor: "pointer"
    },
    inputCount: {
        width: "56px",
        height: "32px",
        borderRadius: "8px",
        textAlign: "center",
        border: "1px solid #ccccbb",
        margin: "0 8px"
    },
}));

export const ItemCount = ({ stock, addItemsToCart }) => {
    const { classes } = useStyles();
    const [count, setCount] = useState(1);

    const addItemToCart = () => {
        if (count > 0 && count <= stock) {
            addItemsToCart(count)
        }
    }

    const addCount = () => {
        if (count < stock) 
            setCount(count+1)
    }

    const subtractCount = () => {
        if (count > 1) 
            setCount(count-1)
    }

    return (
        <div className={classes.itemCountLayout}>
            <div className={classes.itemCountButtonContainer}>
                <button className={classes.itemCountButton} onClick={ subtractCount }>-</button>
                <input type="text" inputMode="numeric" className={classes.inputCount} value={count} onChange={(e) => setCount(parseInt(e.target.value)) } />
                <button className={classes.itemCountButton} onClick={ addCount }>+</button>
            </div>
            <Button
                variant="gradient"
                gradient={{ from: "#810000", to: "#690000", deg: 35 }}
                onClick={() => addItemToCart()}
                size="xs"
            >
                Agregar al carrito
            </Button>
        </div>
    );
};
