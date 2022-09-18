import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
    itemListContainer: {
        margin: "0px",
        height: "240px",
        width: "100%",
        backgroundColor: "rgba(129, 0, 0, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "start"
    },
    greeting: {
        margin: "0px",
        fontFamily: "Roboto",
        fontWeight: "700",
        color: "#FFF",
        padding: "32px 0"
    },
}));

export const ItemListContainer = ({ greeting }) => {
    const { classes } = useStyles();
    return (
        <div className={classes.itemListContainer}>
            <h2 className={classes.greeting}>{greeting}</h2>
        </div>
    );
};
