import { Container } from 'react-bootstrap';
import styles from './styles.module.css';
import { Footer, Header } from '@components/common';
import { Outlet } from 'react-router-dom';
import Aside from '@components/common/Aside/Aside';
import { useLocation } from 'react-router-dom';
import CartBar from '@components/common/CartBar/CartBar';
const { container, wrapper } = styles;
const MainLayout = () => {
  const isSmallScreen = window.innerWidth <= 991; //767
  const location = useLocation();
  const shouldHideAside =
    location.pathname.startsWith('/categories/products') ||
    location.pathname.startsWith('/products') ||
    location.pathname.startsWith('/categories');
  return (
    <Container className={container}>
      <Header />
      <div style={{ display: 'flex' }}>
        <main style={{ flex: '1' }}>
          <div className={wrapper}>
            <Outlet />
          </div>
        </main>
        {shouldHideAside && !isSmallScreen && <Aside />}
      </div>
      {shouldHideAside && isSmallScreen && <CartBar />}
      <Footer />
    </Container>
  );
};

export default MainLayout;
