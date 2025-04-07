import styles from './styles.module.css';
const { footerContainer } = styles;
const currentYear = new Date().getFullYear().toString();
const Footer = () => {
  return (
    <div className={footerContainer}>
      © {currentYear} Q Shop . All rights reserved.
    </div>
  );
};

export default Footer;
