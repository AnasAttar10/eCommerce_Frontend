import { Col, Row } from 'react-bootstrap';
import ContentLoader from 'react-content-loader';

const CouponSkeleton = () => {
  const renderList = Array(4)
    .fill(0)
    .map((_, idx) => (
      <Col
        xs={12}
        md={6}
        key={idx}
        className="d-flex justify-content-center mb-5 mt-2"
      >
        <ContentLoader
          speed={2}
          width={406}
          height={225}
          viewBox="0 0 406 225"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="2" ry="2" width="400" height="400" />
        </ContentLoader>
      </Col>
    ));
  return <Row>{renderList}</Row>;
};

export default CouponSkeleton;
