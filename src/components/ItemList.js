import React, { useEffect, useState } from "react";
import { createStyles } from "@mantine/core";
import { Item } from "./Item";
import products from "../assets/products.json";

const useStyles = createStyles((theme) => ({
    itemListLayout: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "16px",
    },
    item: {
        display: "flex",
        justifyContent: "center",
    },
    loadingText: {
        color: "#FFF",
        fontSize: "24px",
    },
}));

export const ItemList = ({ categoryId }) => {
    const [items, setItems] = useState(null);
    const { classes } = useStyles();

    const getProducts = new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.parse(JSON.stringify(products)));
        }, 2000);
    });

    useEffect(() => {
        setItems(null);
        getProducts
            .then((res) => {
                if (categoryId === undefined) {
                    setItems(res);
                } else {
                    setItems(
                        res.filter(
                            (item) => item.categoryId === parseInt(categoryId)
                        )
                    );
                }
            })
            .catch((err) => console.log(err));
    }, [categoryId]);

    return (
        <>
            {!items ? (
                <p className={classes.loadingText}>Cargando...</p>
            ) : (
                <div className={classes.itemListLayout}>
                    {items.map((item) => {
                        return (
                            <div key={item.id} className={classes.item}>
                                <Item {...item} />
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};
