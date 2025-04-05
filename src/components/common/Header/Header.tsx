import { Badge } from 'react-bootstrap';
import styles from './styles.module.css';
import Mainnavbar from '../Navbar/Mainnavbar';
import HeaderLeftBar from './HeaderLeftBar/HeaderLeftBar';
import { useAppSelector } from '@store/hooks';

const { headerContainer, headerLogo } = styles;
const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <header>
      <div className={headerContainer}>
        <h1 className={headerLogo}>
          <span>Our</span> <Badge>eCom</Badge>
        </h1>
        {user.role === 'user' && <HeaderLeftBar />}
      </div>
      <Mainnavbar />
    </header>
  );
};

export default Header;
