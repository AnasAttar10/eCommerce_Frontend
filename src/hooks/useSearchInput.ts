import { useState } from 'react';

const useSearchInput = () => {
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined);
  const handleOnSearch = (value: string) => {
    setSearchValue(value);
  };
  return {
    searchValue,
    handleOnSearch,
  };
};
export default useSearchInput;
