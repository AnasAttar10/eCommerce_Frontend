import styles from './styles.module.css';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
interface IHeaderCounter {
  totalquantities: number;
  logo: React.ReactNode;
  to: string;
  title: string;
}
const { container, totalNum, pumpAnimate, iconWrapper } = styles;
const HeaderCounter = memo(
  ({ totalquantities, logo, title, to }: IHeaderCounter) => {
    const [isAnimate, setIsAnimate] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      if (!totalquantities) return;
      setIsAnimate(true);
      const depounds = setTimeout(() => {
        setIsAnimate(false);
      }, 300);
      return () => clearTimeout(depounds);
    }, [totalquantities]);
    const quantityStyle = `${totalNum} ${isAnimate ? pumpAnimate : ''}`;
    return (
      <div className={container} onClick={() => navigate(to)}>
        <div className={iconWrapper}>
          {logo}
          {totalquantities > 0 && (
            <div className={quantityStyle}>{totalquantities}</div>
          )}
        </div>
        <h3>{title}</h3>
      </div>
    );
  }
);

export default HeaderCounter;
