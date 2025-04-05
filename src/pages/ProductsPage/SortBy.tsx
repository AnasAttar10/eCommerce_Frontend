import { Dropdown, DropdownButton } from 'react-bootstrap';
const SortBy = ({
  handleSelect,
}: {
  handleSelect: (eventKey: string | null) => void;
}) => {
  return (
    <div>
      <DropdownButton
        id="dropdown-sort"
        title="Sort By"
        onSelect={handleSelect}
        variant="secondary"
      >
        <Dropdown.Item eventKey="-sold">best seller</Dropdown.Item>
        <Dropdown.Item eventKey="ratingsAverage">Highest rated</Dropdown.Item>
        <Dropdown.Item eventKey="price">
          Price from lowest to highest
        </Dropdown.Item>
        <Dropdown.Item eventKey="-price">
          Price from highest to lowest
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

export default SortBy;
