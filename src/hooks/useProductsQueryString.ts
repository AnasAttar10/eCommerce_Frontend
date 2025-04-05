import { useEffect, useState } from 'react';
import usePagination from './usePagination';
import { TFilter } from '@validations/filterSchema';

const useQueryString = (
  limit: number,
  prefix?: string,
  searchValue?: string,
  orderEmail?: string
) => {
  const { currentPage, handlePageChange } = usePagination();
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [filterForm, setFilterForm] = useState<TFilter>();
  const handleSelect = (eventKey: string | null) => {
    if (eventKey) {
      setSortBy(eventKey);
    }
  };
  const handleFilterFormChange = (data: TFilter) => {
    setFilterForm(data);
  };
  let stringQuery = `?page=${currentPage}&limit=${limit}&`;
  const builtQueryString = () => {
    if (prefix) stringQuery += 'cat_prefix=' + prefix + '&';
    if (searchValue) {
      stringQuery += 'keyword=' + searchValue + '&';
    }
    if (orderEmail) {
      stringQuery += 'orderEmail=' + orderEmail + '&';
    }
    if (sortBy) stringQuery += 'sort=' + sortBy + '&';
    if (filterForm?.brands && filterForm?.brands.length > 0) {
      const result = filterForm.brands.map((b) => b).join(',');
      stringQuery += 'brand=' + result + '&';
    }
    if (filterForm?.subCategories && filterForm?.subCategories.length > 0) {
      const result = filterForm.subCategories.map((b) => b).join(',');
      stringQuery += 'subCategories=' + result + '&';
    }
    if (filterForm?.priceF && filterForm?.priceF >= 0) {
      stringQuery += 'price[gte]=' + filterForm.priceF + '&';
    }
    if (filterForm?.priceT && filterForm?.priceT >= 0) {
      stringQuery += 'price[lte]=' + filterForm.priceT + '&';
    }
    return stringQuery;
  };
  const stringQueryResult = builtQueryString();
  const [prevQueryString, setPrevQueryString] = useState(stringQueryResult);
  useEffect(() => {
    if (searchValue !== undefined || orderEmail !== undefined) {
      const interval = setTimeout(() => {
        if (stringQueryResult !== prevQueryString) {
          setPrevQueryString(stringQueryResult);
        }
        return () => clearTimeout(interval);
      }, 2000);
    }
  }, [stringQueryResult, prevQueryString, searchValue, orderEmail]);
  const isSendRequest = stringQueryResult !== prevQueryString;
  return {
    handlePageChange,
    handleSelect,
    handleFilterFormChange,
    currentPage,
    stringQueryResult,
    isSendRequest,
  };
};
export default useQueryString;
