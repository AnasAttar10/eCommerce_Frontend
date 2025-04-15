import { LottieHandler } from '@components/feedback';
import { Col, Row } from 'react-bootstrap';

type IGridLis<T> = {
  records: T[];
  emptyMessage: string;
  renderRecord: (record: T) => React.ReactNode;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
  mb?: number;
};
type IHasId = {
  _id: string;
};
const GridList = <T extends IHasId>({
  records,
  renderRecord,
  emptyMessage,
  xs = 12,
  sm = 6,
  md = 6,
  lg = 4,
  xl = 3,
  xxl = 3,
  mb = 5,
}: IGridLis<T>) => {
  const recordsList =
    records.length > 0 &&
    records?.map((r) => (
      <Col
        xs={xs}
        sm={sm}
        md={md}
        lg={lg}
        xl={xl}
        xxl={xxl}
        key={r._id}
        className={`d-flex justify-content-center mb-${mb} mt-2`}
      >
        {renderRecord(r)}
      </Col>
    ));

  if (!(records.length > 0))
    return <LottieHandler type="empty" message={emptyMessage} />;
  return <Row>{recordsList}</Row>;
};

export default GridList;
