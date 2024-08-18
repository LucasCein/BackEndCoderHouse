import { Nav, NavDropdown, Navbar } from "react-bootstrap"
import { CartWidget } from "../CartWidget/CartWidget"
import { Link, NavLink } from "react-router-dom"
import './navbar.css'
import LoginWidget from "../LoginWidget/LoginWidget"
import IconLoginProfile from "../IconLoginProfile/IconLoginProfile"
export const NavBar = () => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
            <section >
                <Link to="/" className="marginNav">
                    <img src="https://i.ibb.co/YPc679g/logo.jpg" alt="" />
                </Link>
            </section>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" >
                <section className="mx-auto">
                    <Nav className="me-auto marginSections">
                        <section className="centerItemsNavs">
                        <NavLink to="/" className={({ isActive }) => isActive ? "sectionActive" : "sectionStyle"} >Inicio</NavLink>
                        </section>
                        <section className="centerItemsNavs">
                        <NavLink to="/productos" className={({ isActive }) => isActive ? "sectionActive" : "sectionStyle"} >Productos</NavLink>

                        </section>

                        {/* <NavDropdown title="Categorias"  className="sectionStyle"> */}
                            {/* <NavDropdown.Item as={Link} to={'/category/buzo'}>Buzos</NavDropdown.Item> */}
                            {/* <NavDropdown.Item as={Link} to={'/category/pantalon'}> */}
                                {/* Pantalones */}
                            {/* </NavDropdown.Item> */}
                        {/* </NavDropdown> */}
                            
                    </Nav>
                </section>

                <Nav>
                    <Nav.Link eventKey={2} href="" className="">
                        <CartWidget />
                        
                    </Nav.Link>
                    <Nav.Link eventKey={2} href="" className="marginCart">
                        <IconLoginProfile></IconLoginProfile>
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>

        </Navbar>

    )
}

