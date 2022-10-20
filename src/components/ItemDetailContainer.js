import React, { useState, useEffect } from "react";
import { createStyles } from "@mantine/core";
import { useParams } from "react-router-dom";
import { ItemDetail } from "./ItemDetail";
import { doc, getDoc, getFirestore } from "firebase/firestore"

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
        const db = getFirestore();
        const itemRef = doc(db, "items", id);

        getDoc(itemRef).then(res => {
            setItem({id: res.id, ...res.data()})
        })
    }, [id]);

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
