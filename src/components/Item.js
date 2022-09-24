import { Card, Image, Text, Group, Badge, createStyles } from "@mantine/core";
import { ItemCount } from "./ItemCount";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    imageSection: {
        padding: theme.spacing.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderBottom: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },

    section: {
        padding: theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },
}));

export function Item({ urlImg, name, description, discount, price, stock }) {
    const { classes } = useStyles();

    return (
        <Card withBorder radius="md" className={classes.card}>
            <Card.Section className={classes.imageSection}>
                <Image src={urlImg} alt="prod_img" />
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
                <Group spacing={30}>
                    <div>
                        <Text size="xl" weight={700} sx={{ lineHeight: 1 }}>
                            ${price}
                        </Text>
                    </div>

                    <ItemCount stock={stock} />
                </Group>
            </Card.Section>
        </Card>
    );
}
