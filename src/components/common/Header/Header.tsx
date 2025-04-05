import { Badge } from 'react-bootstrap';
import styles from './styles.module.css';
import MainNavbar from '../Navbar/Mainnavbar';
import HeaderLeftBar from './HeaderLeftBar/HeaderLeftBar';
import { useAppSelector } from '@store/hooks';

const { headerContainer, headerLogo } = styles;
const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Q</span> <Badge>Shop</Badge>
        </h1>
        {user.role === 'user' && <HeaderLeftBar />}
      </div>
      <MainNavbar />
    </header>
  );
};

export default Header;
