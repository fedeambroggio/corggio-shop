import React, { useState, useEffect } from "react";
import { createStyles } from "@mantine/core";
import { useParams } from "react-router-dom";
import { ItemDetail } from "./ItemDetail";
import products from "../assets/products.json";

const useStyles = createStyles((theme) => ({
    layout: {
        margin: "32px",
        display: "grid",
        gridTemplateColumns: "3fr 2fr",
        gridGap: "16px",
    },
    itemImg: {
        width: "90%",
        height: "400px",
        objectFit: "contain"
    },
}));

export const ItemDetailContainer = () => {
    const { classes } = useStyles();
    const { id } = useParams();
    const [item, setItem] = useState(null);

    useEffect(() => {
        setItem(
            JSON.parse(JSON.stringify(products)).filter(
                (item) => item.id === parseInt(id)
            )[0]
        );
    }, [id]);

    // No es posible hacer fetch dentro del proyecto. Se podría utilizar si hiciera una API
    // const getItem = async () => {
    //     try {
    //         const resp = await fetch("../assets/products.json");
    //         const data = await resp.json();
    //         setItem(data.filter(item => item.id === id))
    //     } catch {
    //         console.log("ERROR")
    //     }
    // }

    // useEffect(() => {
    //     getItem()
    // }, [id]);

    return (
        <div className={classes.layout}>
            {!item ? (
                <p>Cargando...</p>
            ) : (
                <>
                    <img
                        src={item.urlImg}
                        alt="item_img"
                        className={classes.itemImg}
                    />
                    <ItemDetail {...item} />
                </>
            )}
        </div>
    );
};
