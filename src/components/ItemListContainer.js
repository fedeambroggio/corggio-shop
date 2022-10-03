import { useState, useEffect } from "react";
import { createStyles } from "@mantine/core";
import { useParams } from "react-router-dom";
import { ItemList } from "./ItemList";

const useStyles = createStyles((theme) => ({
    itemListContainer: {
        margin: "0px",
        paddingBottom: "48px",
        height: "auto",
        width: "100%",
        backgroundColor: "rgba(129, 0, 0, 0.8)",
        display: "flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center"
    },
    greeting: {
        margin: "0px",
        fontFamily: "Roboto",
        fontWeight: "700",
        color: "#FFF",
        padding: "48px 0"
    },
}));

export const ItemListContainer = ({ greeting }) => {
    const { classes } = useStyles();
    const { id } = useParams();
    const [greetingDisplayed, setgreetingDisplayed] = useState(greeting)

    useEffect(() => {
      setgreetingDisplayed(greeting)
    }, [greeting])
    
    return (
        <div className={classes.itemListContainer}>
            <h2 className={classes.greeting}>{greetingDisplayed}</h2>
            <ItemList categoryId={ id } />
        </div>
    );
};
