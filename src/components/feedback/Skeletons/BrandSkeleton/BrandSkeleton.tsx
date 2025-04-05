import ContentLoader from 'react-content-loader';

import { Row, Col } from 'react-bootstrap';

const BrandSkeleton = () => {
  const renderList = Array(4)
    .fill(0)
    .map((_, idx) => (
      <Col sx={3} key={idx} className="d-flex justify-content-center mb-5 mt-2">
        <ContentLoader
          speed={2}
          width={200}
          height={164}
          viewBox="0 0 200 164"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="-2" y="-2" rx="2" ry="2" width="400" height="140" />
        </ContentLoader>
      </Col>
    ));
  return <Row>{renderList}</Row>;
};

export default BrandSkeleton;
