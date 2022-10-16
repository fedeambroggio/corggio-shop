import { useContext } from "react";
import {
    createStyles,
    Button,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";
import { CartContext } from "../contexts/CartContext";

const useStyles = createStyles((theme) => ({
    cartButton: {
        backgroundColor: "#810000",
        "&:hover": {
            backgroundColor: "#610000",
        },
    },
    itemsText: {
        fontFamily: "Roboto",
        fontWeight: "700",
        color: "#FFF",
        fontSize: "14px",
        marginLeft: "8px"
    }
}));

export const CartWidget = () => {
    const { classes } = useStyles();
    const { productsCount } = useContext(CartContext)
    
    return (
        <Button
            radius="xl"
            sx={{ height: 30 }}
            classNames={{ root: classes.cartButton }}
        >
            <IconShoppingCart />
            {productsCount() > 0 && <p className={classes.itemsText}>{productsCount()}</p>}
        </Button>
    );
};
