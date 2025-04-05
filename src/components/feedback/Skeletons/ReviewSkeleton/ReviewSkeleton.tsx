import ContentLoader from 'react-content-loader';
import { Row, Col } from 'react-bootstrap';
// https://skeletonreact.com/
// this website to built the shapes
const ReviewSkeleton = () => {
  return (
    <Row>
      <Col>
        <ContentLoader viewBox="0 0 1200 160" height={160} width={1200}>
          <rect x="24" y="48" rx="6" ry="6" width="200" height="14" />
          <rect x="24" y="79" rx="3" ry="3" width="850" height="7" />
          <rect x="24" y="99" rx="3" ry="3" width="850" height="7" />
          <rect x="24" y="120" rx="3" ry="3" width="850" height="7" />
        </ContentLoader>
      </Col>
    </Row>
  );
};

export default ReviewSkeleton;
