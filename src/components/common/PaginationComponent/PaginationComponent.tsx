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
        -
      </Button>
      <span>{currentPage}</span>
      <Button
        variant="secondary"
        size="sm"
        disabled={currentPage >= numOfPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        +
      </Button>
    </div>
  );
};

export default PaginationComponent;
