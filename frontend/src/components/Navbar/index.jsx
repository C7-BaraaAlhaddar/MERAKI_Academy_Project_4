import {
  Button,
  NavDropdown,
  Navbar,
  Nav,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

export default function index() {
  return (
    <Navbar bg="warning" className="py-2 fixed-top" expand="lg">
      <Container>
        <Navbar.Brand href="#home">B Store</Navbar.Brand>

        <Navbar.Toggle className="my-2" aria-controls="nav-menu" />

        <Navbar.Collapse id="nav-menu">
          <Nav className="ms-auto">
            <InputGroup className="mb-auto">
              <Form.Control
                placeholder="Search"
                aria-label="Search"
                aria-describedby="basic-addon2"
              />
              <Button variant="outline-secondary" id="button-addon2">
                <BsSearch style={{ marginBottom: "2px" }} />
              </Button>
            </InputGroup>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#link">Cart</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
