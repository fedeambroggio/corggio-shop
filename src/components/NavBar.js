import {
    createStyles,
    Menu,
    Center,
    Header,
    Container,
    Group,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import Logo from "../assets/logo.png";
import { CartWidget } from "./CartWidget";
import { Link } from "react-router-dom";

const HEADER_HEIGHT = 64;

const useStyles = createStyles((theme) => ({
    inner: {
        height: HEADER_HEIGHT,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    links: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: "8px 12px",
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
        },
    },

    linkLabel: {
        marginRight: 5,
    },
    navbarLogo: {
        height: "48px",
        width: "auto"
    },
}));

export default function NavBar({ links }) {
    const { classes } = useStyles();
    const items = links.map((link) => {
        const menuItems = link.links?.map((item) =>  <Link key={item.link} to={item.link}><Menu.Item>{item.label}</Menu.Item></Link>);

        if (menuItems) {
            return (
                <Menu
                    trigger="hover"
                    exitTransitionDuration={0}
                >
                    <Menu.Target>
                        <a
                            href={link.link}
                            key={link.link}
                            className={classes.link}
                            onClick={(event) => event.preventDefault()}
                        >
                            <Center>
                                <span className={classes.linkLabel}>
                                    {link.label}
                                </span>
                                <IconChevronDown size={12} stroke={1.5} />
                            </Center>
                        </a>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

        return (
            <Link
                to={link.link}
                key={link.link}
                className={classes.link}
            >
                {link.label}
            </Link>
        );
    });

    return (
        <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0, filter: "drop-shadow(0 2px 4px rgba(48, 48, 48, 0.5))" }}>
            <Container className={classes.inner} fluid>
                <Link to={"/"}>
                    <img src={Logo} alt="corggio" className={ classes.navbarLogo } />
                </Link>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>
                <Link to={"/cart"}>
                    <CartWidget/>
                </Link>
            </Container>
        </Header>
    );
}
