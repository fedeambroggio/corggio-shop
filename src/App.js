import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ItemListContainer } from "./components/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import NavBar from "./components/NavBar";
import { CartProvider } from "./contexts/CartContext";
import { CartContainer } from "./components/CartContainer";
import { SeeOrders } from "./components/SeeOrders";

const links = [
    { link: "/", label: "Inicio" },
    { link: "/see-order", label: "Consultar" },
    {
        links: [
            { link: "/category/0", label: "Eléctricos" },
            { link: "/category/1", label: "Guantes" },
            { link: "/category/2", label: "Accesorios" },
        ],
        label: "Categorías",
    },
];

function App() {
    return (
        <CartProvider>
            <BrowserRouter>
                <NavBar links={links} />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ItemListContainer
                                greeting={"¡Bienvenidos a Corggio Shop!"}
                            />
                        }
                    >
                        <Route
                            path="/category/:id"
                            element={
                                <ItemListContainer
                                    greeting={"¡Bienvenidos a Corggio Shop!"}
                                />
                            }
                        />
                    </Route>
                    <Route path="/item/:id" element={<ItemDetailContainer />} />
                    <Route path="/cart" element={<CartContainer/>} />
                    <Route path="/see-order" element={<SeeOrders/>} />
                    <Route
                        path="*"
                        element={
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    margin: "32px",
                                }}
                            >
                                Página no encontrada
                            </div>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </CartProvider>
    );
}

export default App;
