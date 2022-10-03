import { Card, Text, Group, Badge, createStyles, Button } from "@mantine/core";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
    card: {
        zIndex: "0",
        width: "340px"
    },
    imageSection: {
        padding: theme.spacing.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: `1px solid theme.colors.gray[3]`,
    },

    section: {
        padding: theme.spacing.md,
        borderTop: `1px solid theme.colors.gray[3]`,
    },
    cardImg: {
        width: "auto",
        maxWidth: "80%",
        height: "200px",
        objectFit: "contain"
    },
    row: {
        display: "flex",
        justifyContent: "space-between"
    }
}));

export function Item({ urlImg, name, description, discount, price, stock, id }) {
    const { classes } = useStyles();

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <img src={urlImg} alt="prod_img" className={classes.cardImg}/>
            </Card.Section>

            <Group position="apart" mt="md">
                <div>
                    <Text weight={500}>{name}</Text>
                    <Text size="xs" color="dimmed">
                        {description}
                    </Text>
                </div>
                {discount > 0 && <Badge variant="outline">-{discount}%</Badge>}
            </Group>

            <Card.Section className={classes.section}>
                <Group spacing={30} className={classes.row}>
                    <div>
                        <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                            ${price}
                        </Text>
                    </div>
                    <Link to={`/item/${id}`}>
                        <Button
                            variant="outline"
                            color="dark"
                            size="xs"
                        >
                            Ver detalles
                        </Button>
                    </Link>
                </Group>
            </Card.Section>
        </Card>
    );
}
