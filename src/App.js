import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { ItemListContainer } from "./components/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer";
import NavBar from "./components/NavBar";

const links = [
    { link: "/", label: "Inicio" },
    { link: "/sales", label: "Ofertas" },
    {
        links: [
            { link: "/category/0", label: "Eléctricos" },
            { link: "/category/1", label: "Guantes" },
            { link: "/category/2", label: "Accesorios" },
        ],
        label: "Categorías",
    },
    { link: "/about", label: "Nosotros" },
];

function App() {
    return (
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
                <Route path="*" element={<div style={{display: "flex", justifyContent:"center", margin: "32px"}}>Página no encontrada</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
