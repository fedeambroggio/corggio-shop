import React, { useEffect, useState } from "react";
import { createStyles } from '@mantine/core';
import { Item } from "./Item";

const products = [
    {
        id: 1,
        urlImg: "",
        name: "Amoladora SKIL 9002",
        description: "700W de potencia",
        discount: 5,
        price: 7200,
        stock: 12
    },
    {
        id: 2,
        urlImg: "",
        name: "Amoladora SKIL 9004",
        description: "830W de potencia",
        discount: 7,
        price: 8500,
        stock: 7
    },
    {
        id: 3,
        urlImg: "",
        name: "Amoladora BOSCH 9002",
        description: "630W de potencia",
        discount: 12,
        price: 11200,
        stock: 31
    },
    {
        id: 4,
        urlImg: "",
        name: "Termofusora TAWAK",
        description: "800W de potencia",
        discount: 0,
        price: 4900,
        stock: 20
    },
];

const useStyles = createStyles((theme) => ({
    itemListLayout: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "10px",
    }
}));

export const ItemList = () => {
    const [items, setItems] = useState([]);
    const { classes } = useStyles();

    const getProducts = new Promise((resolve) => {
        setTimeout(() => {
            resolve(products);
        }, 2000);
    });

    useEffect(() => {
        getProducts
            .then((res) => setItems(res))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={classes.itemListLayout}>
            {items.map((item) => {
                return <Item key={item.id} {...item} />;
            })}
        </div>
    );
};
