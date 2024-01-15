import { Navbar, Container } from "react-bootstrap";
import SearchCity from './SearchCity'
import { Link } from 'react-router-dom';
import logo from '../Data/Logo.png'


const MyNavbar = () => {

    return (
        <>
            <Navbar className="bg-body-light">
                <Container className="d-flex justify-content-between">
                    <Navbar.Brand as={Link} to="/" className="d-flex justify-content-between">
                       <img src={logo} alt='logo' width={100}/>
                        <h1 className=""> MeteoPower⚡ </h1>
                    </Navbar.Brand>
                    <SearchCity />
                </Container>
            </Navbar>
        </>
    )
}

export default MyNavbar