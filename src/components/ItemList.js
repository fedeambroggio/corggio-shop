import React, { useEffect, useState } from "react";
import { createStyles } from "@mantine/core";
import { Item } from "./Item";
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore"

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

    useEffect(() => {        
        const db = getFirestore();
        const itemsCollection = collection(db, "items");

        if (categoryId !== undefined) {
            const q = query(itemsCollection, where("categoryId", "==", parseInt(categoryId)))
            getDocs(q).then(res => {
                setItems(res.docs.map(doc=>({id: doc.id, ...doc.data()})))
            })
        } else {
            getDocs(itemsCollection).then(res => {
                setItems(res.docs.map(doc=>({id: doc.id, ...doc.data()})))
            })
        }
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
