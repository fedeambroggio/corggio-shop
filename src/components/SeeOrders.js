import React, { useState } from "react";
import { createStyles, Button } from "@mantine/core";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { CartItem } from "./CartItem";

const useStyles = createStyles((theme) => ({
    layout: {
        margin: "32px",
    },
    table: {
        width: "90%",
        maxWidth: "1200px",
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
    row: {
        display: "flex",
        margin: "8px 0",
    },
    column: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    customerData: {
        fontFamily: "Roboto",
        fontWeight: "500",
        color: "#000",
        marginRight: "16px",
    },
    title: {
        fontFamily: "Roboto",
        fontWeight: "700",
        color: "#000",
        fontSize: "24px",
        margin: "0",
    },
    margin: {
        width: "200px",
        margin: "8px"
    }
}));

export const SeeOrders = () => {
    const { classes } = useStyles();
    const [orderId, setOrderId] = useState(null);
    const [orderResponse, setOrderResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)

        const db = getFirestore();
        const orderRef = doc(db, "orders", orderId);

        getDoc(orderRef).then((res) => {
            setOrderResponse({ id: res.id, ...res.data() });
            setLoading(false)
        });
    };

    if (loading) return <p className={classes.column}>Cargando...</p>
    return (
        <div className={classes.layout}>
            {orderResponse !== null ? (
                <div>
                    <p className={classes.title}>Información de su pedido</p>
                    <div className={classes.row}>
                        <p className={classes.customerData}>
                            <strong>Nombre:</strong>{" "}
                            {orderResponse["buyer"]["name"]}
                        </p>
                        <p className={classes.customerData}>
                            <strong>Celular:</strong>{" "}
                            {orderResponse["buyer"]["phone"]}
                        </p>
                        <p className={classes.customerData}>
                            <strong>Mail:</strong>{" "}
                            {orderResponse["buyer"]["mail"]}
                        </p>
                    </div>
                    <>
                        <table className={classes.table}>
                            <tr className={classes.tableHeaders}>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Precio Total</th>
                            </tr>
                            {orderResponse["items"]?.map((item, i) => {
                                return (
                                    <CartItem
                                        key={i}
                                        {...item}
                                        version="details"
                                    />
                                );
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
                                ${orderResponse["total"]}
                            </p>
                        </div>
                    </>
                    <Button
                        variant="gradient"
                        gradient={{
                            from: "#810000",
                            to: "#690000",
                            deg: 35,
                        }}
                        size="sm"
                        onClick={() => setOrderResponse(null)}
                    >
                        Seguir consultando
                    </Button>
                </div>
            ) : (
                <div>
                    <form onSubmit={handleSubmit} className={classes.column}>
                        <label className={classes.title}>
                            Ingrese su código de orden:
                        </label>
                            <input
                                className={classes.margin}
                            type="text"
                            onChange={(e) => setOrderId(e.target.value)}
                        />
                        <input type="submit" value="Consultar" className={classes.margin}/>
                    </form>
                </div>
            )}
        </div>
    );
};
