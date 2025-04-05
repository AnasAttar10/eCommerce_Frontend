type TSearchInput = {
  handleOnSearch: (value: string) => void;
  placeholder?: string;
};
const SearchInput = ({ handleOnSearch, placeholder }: TSearchInput) => {
  return (
    <div
      style={{
        width: '90%',
        margin: 'auto',
      }}
    >
      <form className="form-inline">
        <input
          className="form-control mr-sm-2"
          type="search"
          placeholder={placeholder ?? 'Search by name '}
          aria-label="Search"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleOnSearch(e.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default SearchInput;
