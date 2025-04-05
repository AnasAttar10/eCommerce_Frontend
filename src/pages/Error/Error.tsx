import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';
import LottieHandler from '@components/feedback/LottieHandler/LottieHandler';

const { wrapper } = styles;
const Error = () => {
  return (
    <Container className={wrapper}>
      <LottieHandler type="notFound" />
      <Link replace={true} to={'/'}>
        How about go back safty ?
      </Link>
    </Container>
  );
};

export default Error;
