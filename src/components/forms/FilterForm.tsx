import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { useGetBrandsQuery } from '@store/Brand/brandsApi';
import { useForm } from 'react-hook-form';
import CheckboxInput from './CheckBoxInput/CheckboxInput';
import { filterSchema, TFilter } from '@validations/filterSchema';
import { Form } from 'react-bootstrap';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetSubcategoriesBasedOnCategoryQuery } from '@store/Category/categoriesApi';
import Input from './Input/Input';
import { useEffect, useState } from 'react';

const FilterForm = ({
  showBrands,
  showSubCategories,
  showPrice,
  categoryId,
  handleFilterFormChange,
}: {
  showBrands?: boolean;
  showSubCategories?: boolean;
  showPrice?: boolean;
  categoryId: string;
  handleFilterFormChange: (data: TFilter) => void;
}) => {
  const { data: brands, error: getBrandsError } = useGetBrandsQuery('', {
    skip: !showBrands,
  });
  const { data: subCategories, error: getSubCategoriesError } =
    useGetSubcategoriesBasedOnCategoryQuery(categoryId, {
      skip: !categoryId || !showSubCategories,
    });
  const [prevData, setPrevData] = useState<TFilter | undefined>(undefined);
  const {
    control,
    register,
    watch,
    getValues,
    formState: { errors },
  } = useForm<TFilter>({
    mode: 'onChange',
    defaultValues: { brands: [] },
    resolver: zodResolver(filterSchema),
  });
  const watchedValues = watch();

  useEffect(() => {
    const data = getValues();
    if (JSON.stringify(prevData) !== JSON.stringify(data)) {
      handleFilterFormChange(data);
      setPrevData(data);
    }
  }, [watchedValues, getValues, handleFilterFormChange, prevData]); // Dependencies ensure reactivity
  return (
    <Form
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
        padding: '10px 0',
      }}
    >
      {showBrands && (
        <CheckboxInput
          control={control}
          label="Brands"
          name="brands"
          error={errors.brands?.message}
          data={brands?.data ?? []}
          flexDirection="row"
        />
      )}
      {showSubCategories && (
        <CheckboxInput
          control={control}
          label="Subcategories"
          name="subcategories"
          error={errors.subcategories?.message}
          data={subCategories?.data ?? []}
          flexDirection="row"
        />
      )}
      {showPrice && (
        <>
          <p>Price </p>
          <div
            style={{
              width: '120px',
            }}
          >
            <label>From </label>
            <Input
              name="priceF"
              register={register}
              type="number"
              error={errors?.priceF?.message}
            />
            <label>To</label>
            <Input
              name="priceT"
              type="number"
              register={register}
              error={errors?.priceT?.message}
            />
          </div>
        </>
      )}

      {getBrandsError && <ErrorMessage error={getBrandsError} />}
      {getSubCategoriesError && <ErrorMessage error={getSubCategoriesError} />}
    </Form>
  );
};

export default FilterForm;
