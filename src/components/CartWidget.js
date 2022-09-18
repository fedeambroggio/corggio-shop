import {
    createStyles,
    Button,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons";

const useStyles = createStyles((theme) => ({
    cartButton: {
        backgroundColor: "#810000",
        "&:hover": {
            backgroundColor: "#610000",
        },
    },
}));

export const CartWidget = () => {
    const { classes } = useStyles();
    return (
        <Button
            radius="xl"
            sx={{ height: 30 }}
            classNames={{ root: classes.cartButton }}
        >
            <IconShoppingCart />
        </Button>
    );
};
