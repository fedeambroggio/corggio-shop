import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../contexts/CartContext";
import { CartItem } from "./CartItem";
import { createStyles, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { doc, getDoc, addDoc, updateDoc, collection, getFirestore } from "firebase/firestore"

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
    const { cartProducts, clearCart } = useContext(CartContext);
    const [total, setTotal] = useState(0);
    const [orderId, setOrderId] = useState(null);
    const { classes } = useStyles();

    const updateStock  = async () => {
        const db = getFirestore();

        cartProducts.forEach(item => {
            const itemRef = doc(db, "items", item.id);
            getDoc(itemRef).then(res => {
                updateDoc(itemRef, {stock: res.data().stock - item.quantity})
            })
        })
    }

    const makeOrder = () => {
        const buyer = { name: "Federico", phone: "3511111111", mail: "federico@gmail.com" }
        const order = {
            buyer: buyer,
            date: new Date(),
            items: cartProducts,
            total: total
        }
        
        const db = getFirestore();
        const ordersCollection = collection(db, "orders")
        addDoc(ordersCollection, order).then(({ id }) => {
            setOrderId(id)
            updateStock()
            clearCart()
        })
    }

    useEffect(() => {
        let acum = 0;
        cartProducts.forEach((p) => {
            acum += p.price * p.quantity;
        });

        setTotal(acum);
    }, []);

    if (orderId) {
        return (
            <div className={classes.layout}>
                <h2>Gracias por su compra</h2>
                <p><strong>Número de seguimiento: </strong> {orderId}</p>
                <Link to={`/`}>
                        <Button
                            variant="gradient"
                            gradient={{
                                from: "#810000",
                                to: "#690000",
                                deg: 35,
                            }}
                            size="sm"
                        >
                            Volver al inicio
                        </Button>
                    </Link>
            </div>
        )
    }

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
                    <Button
                            variant="gradient"
                            gradient={{
                                from: "#810000",
                                to: "#690000",
                                deg: 35,
                            }}
                        size="sm"
                        onClick={makeOrder}
                        >
                            Finalizar compra
                        </Button>
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
