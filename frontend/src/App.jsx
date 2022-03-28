import "./style.css";
import logo from "./logo.png";
import { Navbar, Container, Nav } from "react-bootstrap"; 
import { Routes, Route } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Cases from "./Cases";
import Article from "./Article";
import Translate from "./Translate";






export default function App() {




  return (
    <div className="App">
      <img className="background-logo" src={logo} alt="" />
      <Navbar className="nav" expand="sm">
        <Container fluid>
          <NavLink style={{ marginLeft:'1rem' }} to="/">
            <img className="nav-logo" src={logo} alt="" />
          </NavLink>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="p-1 d-flex sub-nav "
              style={{ maxHeight: "190px" }}
              navbarScroll
            >
              <NavLink to="/article" element={<Article />} >Article</NavLink>
              <NavLink to="/cases" element={<Cases />}>Cases</NavLink>
              <NavLink to="/translate" element={<Translate />}>Meaning(en-en)</NavLink>
              <NavLink to="/conjunction">Translation(de-en)</NavLink>
              <NavLink to="/Modal-verb">Preposition</NavLink>
              <NavLink to="/main/metar-taf-decoded">Tense</NavLink>
              <NavLink to="/main/archive">Verb</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="router-path">
        <Routes>
          <Route path="/article" element={<Article />} />
          <Route path="/cases" element={<Cases />} />
          <Route path="/translate" element={<Translate />} />
          {/*<Route path="main/metar" element={<Metar />} />
          <Route path="main/taf" element={<Taf />} />
          <Route path="main/metar-taf" element={<MetarTaf />} />
          <Route path="main/metar-taf-decoded" element={<MetarTafDecoded />} />
          <Route path="main/archive" element={<Archive />} /> */}
        </Routes>
      </div>
    </div>
  );
}
