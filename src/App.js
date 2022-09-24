import './App.css';
import { ItemListContainer } from './components/ItemListContainer';
import NavBar from "./components/NavBar";

const links = [
  { link: "wwww.google.com.ar", label: "Inicio" },
  { link: "wwww.google.com.ar", label: "Ofertas" },
  {
    links: [
      { link: "wwww.google.com.ar", label: "Eléctricos" },
      { link: "wwww.google.com.ar", label: "Guantes" },
      { link: "wwww.google.com.ar", label: "Accesorios" },
      { link: "wwww.google.com.ar", label: "Herramientas de mano" },
    ],
    label: "Categorías"
  },
  { link: "wwww.google.com.ar", label: "Nosotros" }
]

function App() {
  return (
    <div>
      <NavBar links={links} />
      <ItemListContainer greeting={"¡Bienvenidos a Corggio Shop!"} />
    </div>
  );
}

export default App;
