import { Logout } from '@store/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setSearchValue } from '@store/searchProduct/searchSlice';
import { useEffect, useRef } from 'react';
import { Container, Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

const MainNavbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, token } = useAppSelector((state) => state.auth);
  const { productName } = useAppSelector((state) => state.search);
  const isProductsPage = location.pathname.startsWith('/products');
  const prevLocationRef = useRef(location.pathname);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    dispatch(setSearchValue(value));
  };

  useEffect(() => {
    if (productName && !isProductsPage) {
      const interval = setTimeout(() => {
        navigate('/products');
      }, 1000);
      return () => clearTimeout(interval);
    }
  }, [productName, isProductsPage, navigate, dispatch]);

  useEffect(() => {
    const prevPath = prevLocationRef.current;
    prevLocationRef.current = location.pathname;

    const wasOnProductsPage = prevPath.startsWith('/products');
    const leftProductsPage = wasOnProductsPage && !isProductsPage;

    if (leftProductsPage) {
      dispatch(setSearchValue(undefined));
    }
  }, [isProductsPage, dispatch]);
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="categories">
              Categories
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Form className="d-flex flex-grow-1">
          <Form.Control
            type="search"
            name="search"
            placeholder="Search by product name "
            className="ms-2 me-2 flex-grow-1"
            aria-label="Search"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
        </Form>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {!token ? (
              <>
                <Nav.Link as={NavLink} to="auth/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="auth/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <NavDropdown
                title={`welcome ${user.name}`}
                id="basic-nav-dropdown"
              >
                {user.role !== 'user' ? (
                  <>
                    <NavDropdown.Item to="admin" end as={NavLink}>
                      Dashboard
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item to="profile" end as={NavLink}>
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item to="profile/orders" as={NavLink}>
                      Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item to="profile/address" as={NavLink}>
                      Address
                    </NavDropdown.Item>
                  </>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => dispatch(Logout())}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
