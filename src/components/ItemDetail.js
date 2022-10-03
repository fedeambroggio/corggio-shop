import React from "react";
import { createStyles, Badge } from "@mantine/core";
import { ItemCount } from "./ItemCount";

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
        alignSelf: "flex-start"
    },
}));

export const ItemDetail = ({ name, price, stock, description, discount }) => {
    const { classes } = useStyles();

    return (
        <div className={classes.layout}>
            <h1>{name}</h1>
            <div className={classes.row}>
                <h2>$ {price}</h2>
                {discount > 0 && <Badge variant="outline">-{discount}%</Badge>}
            </div>
            <p>{description}</p>
            <p>Artículos restantes: {stock}</p>

            <div className={classes.row} style={{ margin: "32px", alignSelf: "center"}}>
                <ItemCount stock={stock} />
            </div>
        </div>
    );
};
