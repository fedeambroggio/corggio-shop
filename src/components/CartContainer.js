import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { CartItem } from "./CartItem";
import { createStyles, Button } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    layout: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: "40px",
    },
    table: {
        width: "90%",
        maxWidth: "1200px",
        // padding: "8px",
        border: "1px solid #dddddd",
    },
    tableHeaders: {
        height: "32px",
        backgroundColor: "#810000",
        color: "#FFF",
    },
    checkoutContainer: {
        width: "90%",
        maxWidth: "1200px",
        display: "flex",
        justifyContent: "end",
    },
    totalText: {
        fontFamily: "Roboto",
        fontWeight: "500",
        color: "#FFF",
        backgroundColor: "#810000",
        padding: "8px",
        border: "2px solid #dddddd",
    },
    noItemsText: {
        fontFamily: "Roboto",
        fontSize: "24px",
        fontWeight: "500",
        color: "#000",
    },
}));

export const CartContainer = () => {
    const { cartProducts } = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const { classes } = useStyles();

    useEffect(() => {
        let acum = 0;
        cartProducts.forEach((p) => {
            acum += p.price * p.quantity;
        });

        setTotal(acum);
    }, []);

    return (
        <div className={classes.layout}>
            {cartProducts.length > 0 ? (
                <>
                    <table className={classes.table}>
                        <tr className={classes.tableHeaders}>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Precio Total</th>
                            <th>Eliminar</th>
                        </tr>
                        {cartProducts?.map((item, i) => {
                            return <CartItem key={i} {...item} />;
                        })}
                    </table>
                    <div className={classes.checkoutContainer}>
                        <p className={classes.totalText}>
                            <span
                                style={{
                                    fontWeight: "800",
                                }}
                            >
                                TOTAL:{" "}
                            </span>
                            ${total}
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <p className={classes.noItemsText}>
                        No hay ítems en el carrito
                    </p>
                    <Link to={`/`}>
                        <Button
                            variant="gradient"
                            gradient={{
                                from: "#810000",
                                to: "#690000",
                                deg: 35,
                            }}
                            size="md"
                        >
                            Comenzar a comprar
                        </Button>
                    </Link>
                </>
            )}
        </div>
    );
};
