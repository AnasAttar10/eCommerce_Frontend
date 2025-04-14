import { Button } from 'react-bootstrap';

type TPaginationComponent = {
  currentPage: number;
  numOfPages: number;
  onPageChange: (page: number) => void;
};
const PaginationComponent = ({
  currentPage,
  numOfPages,
  onPageChange,
}: TPaginationComponent) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        gap: '10px',
        marginBottom: '20px',
      }}
    >
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </Button>
      <span>
        {currentPage} /{numOfPages}{' '}
      </span>
      <Button
        variant="primary"
        size="sm"
        disabled={currentPage >= numOfPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
};

export default PaginationComponent;
