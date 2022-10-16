import React, { useContext } from "react";
import { createStyles } from "@mantine/core";
import { IconTrash } from "@tabler/icons";
import { CartContext } from "../contexts/CartContext";

const useStyles = createStyles((theme) => ({
    img: {
        width: "auto",
        height: "48px",
        objectFit: "contain",
    },
    text: {
        fontFamily: "Roboto",
        fontWeight: "500",
        color: "#000",
    },
    tableRow: {
        height: "72px",
        border: "1px solid #dddddd",
    },
    tableColumn: {
        textAlign: "center",
    },
    icon: {
        cursor: "pointer"
    }
}));

export const CartItem = ({ id, name, urlImg, price, quantity, key }) => {
    const { classes } = useStyles();
    const { removeProduct } = useContext(CartContext);

    const deleteItems = () => {
        removeProduct(id)
    }

    return (
        <tr className={classes.tableRow} key={key}>
            <td className={classes.tableColumn}>
                <img src={urlImg} className={classes.img} />
            </td>
            <td className={classes.tableColumn}>
                <p className={classes.text}>{name}</p>
            </td>
            <td className={classes.tableColumn}>
                <p className={classes.text}>{quantity}</p>
            </td>
            <td className={classes.tableColumn}>
                <p className={classes.text}>$ {price}</p>
            </td>
            <td className={classes.tableColumn}>
                <p className={classes.text}>$ {quantity * price}</p>
            </td>
            <td className={classes.tableColumn}>
                <IconTrash className={classes.icon} onClick={ deleteItems } />
            </td>
        </tr>
    );
};
