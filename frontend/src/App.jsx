import "./style.css";
import logo from "./logo.png";
import logo1 from "./logo1.png";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Cases from "./Cases";
import Article from "./Article";
import Translate from "./En-En";
import TranslateToGerman from "./De-En";
import Home from "./Home";


export default function App() {

return (
<div className="App">

  <img className="background-logo" src={logo} alt="" />
  <Navbar className="navigation" expand="md">
    <Container fluid>
      <NavLink style={{ opacity: 0.85 }} to="/">
        <img className="nav-logo" src={logo1} alt="" />
        
      </NavLink>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="p-1 d-flex sub-nav " style={{ maxHeight: "190px" }} navbarScroll>
          <NavLink to="/article" element={<Article />}>
          Article
          </NavLink>
          <NavLink to="/cases" element={<Cases />}>
          Cases
          </NavLink>
          <NavLink to="/Modal-verb">Preposition</NavLink>
          <NavLink to="/main/archive">Verb</NavLink>
          <NavLink to="/translate" element={<Translate />}>
          En-En
          </NavLink>
          <NavLink to="/toGerman">De-En</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>

  <div className="router-path">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/article" element={<Article />} />
      <Route path="/cases" element={<Cases />} />
      <Route path="/translate" element={<Translate />} />
      <Route path="toGerman" element={<TranslateToGerman />} />
    </Routes>
  </div>

  <footer>
    <p>© 2022, Nasim Reza</p>
  </footer>

  

</div>
);
}