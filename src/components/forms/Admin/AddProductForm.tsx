import { Button, Form, Spinner } from 'react-bootstrap';
import Input from '../Input/Input';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import FileInput from '../FileInput/FileInput';

import useUploadImage from '@hooks/useUploadImage';
import { useEffect, useState } from 'react';
import {
  useAddProductMutation,
  useGetProductQuery,
  useUpdateProductMutation,
} from '@store/Product/productsApi';
import SelectInput from '../SelectInput/SelectInput';
import {
  addProductSchema,
  updateProductSchema,
} from '@validations/Admin/addProductSchema';
import { useGetCategoriesQuery } from '@store/Category/categoriesApi';
import { useGetBrandsQuery } from '@store/Brand/brandsApi';
import { useGetSubCategoriesQuery } from '@store/SubCategories/subCategoriesApi';
const colorOptions = [
  { value: '#FF6F61', label: 'Primary', color: '#FF6F61' },
  { value: '#2A9D8F', label: 'Secondary', color: '#2A9D8F' },
  { value: '#F4A261', label: 'Accent', color: '#F4A261' },
  { value: '#264653', label: 'Dark', color: '#264653' },
  { value: '#E9C46A', label: 'Light', color: '#E9C46A' },
  { value: '#4CAF50', label: 'Success', color: '#4CAF50' },
  { value: '#E76F51', label: 'Warning', color: '#E76F51' },
  { value: '#3498DB', label: 'Info', color: '#3498DB' },
  { value: '#F8F9FA', label: 'Background', color: '#F8F9FA' },
  { value: '#D1D1D1', label: 'Border', color: '#D1D1D1' },
];
type TAddProductForm = {
  recordId: string;
  handleCloseForm: () => void;
};
type TProductForm = {
  title: string;
  description: string;
  quantity: number;
  sold?: number;
  price: number;
  priceAfterDiscount?: number;
  colors?: string[];
  imageCover: File | string | undefined;
  images?: (string | File)[] | undefined;
  db_images?: string[];
  removed_DB_images?: string[];
  category: string;
  subcategories?: string[];
  brand?: string;
};
const AddProductForm = ({ recordId, handleCloseForm }: TAddProductForm) => {
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();
  const { image, images, onImageChange, setImage, setImages } =
    useUploadImage();
  const {
    data: categories,
    isLoading: getCategoriesLoading,
    error: getCategoriesError,
  } = useGetCategoriesQuery('');
  const {
    data: brands,
    isLoading: getBrandsLoading,
    error: getBrandsError,
  } = useGetBrandsQuery('');

  const {
    data: subCategories,
    isLoading: getSubCategoriesLoading,
    error: getSubCategoriesError,
  } = useGetSubCategoriesQuery(selectedCategory as string, {
    skip: !selectedCategory,
  });

  const {
    data,
    error: getProductError,
    refetch,
  } = useGetProductQuery(recordId, {
    skip: !recordId,
  });
  const [
    addProduct,
    {
      isLoading: addProductLoading,
      error: addProductError,
      isSuccess: isSuccessAdding,
    },
  ] = useAddProductMutation();
  const [
    updateProduct,
    {
      isLoading: updateProductLoading,
      error: updateProductError,
      isSuccess: isSuccessUpdating,
    },
  ] = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    trigger,
    watch,
    reset,
    formState: { errors },
  } = useForm<TProductForm>({
    mode: 'onSubmit',
    resolver: zodResolver(recordId ? updateProductSchema : addProductSchema),
  });
  const filterImages = <T extends File | string>(
    images: (File | string)[],
    type: 'file' | 'url'
  ): T[] => {
    return images.filter((i) =>
      type === 'file' ? i instanceof File : typeof i === 'string'
    ) as T[];
  };
  const [isFirstTimeToUpdating, setIsFirstTimeToUpdating] = useState(true);
  const [isFirstTimeToAdding, setIsFirstTimeToAdding] = useState(true);
  const addingSubmit: SubmitHandler<TProductForm> = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('quantity', `${data.quantity}`);
    if (data.sold) formData.append('sold', `${data.sold}`);
    formData.append('price', `${data.price}`);
    formData.append('priceAfterDiscount', `${data.priceAfterDiscount}`);
    if (data.colors)
      data.colors.forEach((color) => {
        formData.append('colors[]', color);
      });
    if (data.imageCover instanceof File) {
      formData.append('imageCover', data.imageCover);
    }

    if (data.images) {
      Array.from([...data.images]).forEach((file) => {
        formData.append('images', file as File);
      });
    }
    if (data.category) formData.append('category', data.category);

    if (data.brand) formData.append('brand', data.brand);
    data.subcategories &&
      data.subcategories.forEach((subcategory) => {
        formData.append('subcategories[]', subcategory as string);
      });
    await addProduct(formData);
  };

  const updatingSubmit: SubmitHandler<TProductForm> = async (formData) => {
    const updateDataForm = new FormData();
    const updatedFields: Partial<TProductForm> = {};
    if (!data?.data) return;
    if (formData.title !== data.data.title) {
      updatedFields.title = formData.title;
      updateDataForm.append('title', formData.title);
    }
    if (formData.description !== data.data.description) {
      updatedFields.description = formData.description;
      updateDataForm.append('description', formData.description);
    }
    if (formData.quantity !== data.data.quantity) {
      updatedFields.quantity = formData.quantity;
      updateDataForm.append('quantity', `${formData.quantity}`);
    }
    if (formData.sold !== data.data.sold) {
      updatedFields.sold = formData.sold;
      updateDataForm.append('sold', `${formData.sold}`);
    }
    if (formData.price !== data.data.price) {
      updatedFields.price = formData.price;
      updateDataForm.append('price', `${formData.price}`);
    }
    if (formData.priceAfterDiscount !== data.data.priceAfterDiscount) {
      updatedFields.priceAfterDiscount = formData.priceAfterDiscount;
      updateDataForm.append(
        'priceAfterDiscount',
        `${formData.priceAfterDiscount}`
      );
    }
    if (JSON.stringify(formData.colors) != JSON.stringify(data.data.colors)) {
      updatedFields.colors = formData.colors;
      if (formData.colors) {
        formData.colors.length > 0
          ? formData.colors.forEach((color) => {
              updateDataForm.append('colors[]', color);
            })
          : updateDataForm.append('colors[]', `${undefined}`);
      }
    }
    if (formData.imageCover !== data.data.imageCover) {
      updatedFields.imageCover = formData.imageCover;
      updateDataForm.append('imageCover', formData.imageCover as File);
    }

    if (formData.images) {
      const newImages = filterImages<File>(formData.images, 'file');
      if (newImages.length > 0) {
        updatedFields.images = newImages;
        newImages.forEach((image) => {
          updateDataForm.append('images', image);
        });
      }
      const DB_Images = filterImages<string>(formData.images, 'url');
      if (
        JSON.stringify(DB_Images as string[]) !=
        JSON.stringify(data.data.images)
      ) {
        updatedFields.db_images = DB_Images;
        DB_Images.length > 0
          ? DB_Images.forEach((image) => {
              updateDataForm.append('db_images', image);
            })
          : updateDataForm.append('db_images', '');
      }
    }

    if (formData.category !== data.data.category._id) {
      updatedFields.category = formData.category;
      updateDataForm.append('category', `${formData.category}`);
    }
    if (formData.brand !== data.data.brand) {
      updatedFields.brand = formData.brand;
      updateDataForm.append('brand', `${formData.brand}`);
    }
    if (
      JSON.stringify(formData.subcategories) !=
      JSON.stringify(data.data.subcategories)
    ) {
      updatedFields.subcategories = formData.subcategories;
      if (formData.subcategories) {
        formData.subcategories.length > 0
          ? formData.subcategories.forEach((sub) => {
              updateDataForm.append('subcategories[]', sub);
            })
          : updateDataForm.append('subcategories[]', `${undefined}`);
      }
    }
    if (Object.keys(updatedFields).length > 0) {
      await updateProduct({ data: updateDataForm, id: recordId });
    } else {
      console.log('No changes detected');
    }
  };

  const category = watch('category');
  useEffect(() => {
    if (data?.data && images?.length === 0 && isFirstTimeToUpdating) {
      reset({
        title: data.data.title,
        description: data.data.description,
        quantity: data.data.quantity,
        sold: data.data.sold,
        price: data.data.price,
        priceAfterDiscount: data.data.priceAfterDiscount,
        colors: data.data.colors,
        imageCover: data.data.imageCover,
        images: data.data.images,
        category: data.data.category._id,
        subcategories: data.data.subcategories,
        brand: data.data.brand,
      });
      setImage({ url: data.data.imageCover, name: data.data.title });
      const Db_Images = data.data.images?.map((i) => ({
        url: i,
        name: data.data.title,
      }));
      setImages(Db_Images);
      setIsFirstTimeToUpdating(false);
    } else if (!data?.data && isFirstTimeToAdding) {
      reset({
        title: undefined,
        description: undefined,
        quantity: 0,
        sold: undefined,
        price: 0,
        priceAfterDiscount: undefined,
        colors: undefined,
        images: undefined,
        category: undefined,
        subcategories: undefined,
        brand: undefined,
        db_images: undefined,
      });
      setImage(undefined);
      setImages([]);
      setIsFirstTimeToAdding(false);
    }
  }, [
    data?.data,
    reset,
    setImage,
    setImages,
    images?.length,
    isFirstTimeToUpdating,
    isFirstTimeToAdding,
  ]);

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  useEffect(() => {
    if (isSuccessAdding) handleCloseForm();
    if (isSuccessUpdating) {
      refetch();
      handleCloseForm();
    }
  }, [refetch, isSuccessAdding, isSuccessUpdating, handleCloseForm]);
  return (
    <div>
      <Form
        onSubmit={
          recordId ? handleSubmit(updatingSubmit) : handleSubmit(addingSubmit)
        }
        className="col-xs-12 col-md-6"
      >
        <Input
          label="Product Name "
          name="title"
          register={register}
          error={errors.title?.message}
        />
        <Input
          label="Product Description "
          name="description"
          as="textarea"
          register={register}
          error={errors.description?.message}
        />
        <Input
          label="Product Quantity "
          name="quantity"
          type="number"
          register={register}
          error={errors.quantity?.message}
        />
        <Input
          label="Product Sold "
          name="sold"
          type="number"
          register={register}
          error={errors.sold?.message}
        />
        <Input
          label="Product Price "
          name="price"
          type="number"
          register={register}
          error={errors.price?.message}
        />
        <Input
          label="Product priceAfterDiscount "
          name="priceAfterDiscount"
          type="number"
          register={register}
          error={errors.priceAfterDiscount?.message}
        />
        <SelectInput
          options={colorOptions}
          name="colors"
          label="Colors"
          multiple
          control={control}
          error={errors.colors?.message}
          withStyle
        />
        <FileInput
          inputId="productButton"
          label="product Image Cover "
          name="imageCover"
          type="file"
          accept="image/*"
          control={control}
          error={errors.imageCover?.message}
          srcAndName={
            image
              ? [image]
              : data && [{ url: data.data.imageCover, name: data.data.title }]
          }
          multiple={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) {
              setValue('imageCover', file, { shouldValidate: true });
              trigger('imageCover');
              onImageChange(file);
            }
          }}
        />
        <FileInput
          inputId="productImagesButton"
          label="product Images "
          name="images"
          type="file"
          accept="image/*"
          multiple={true}
          control={control}
          error={errors.images?.message}
          srcAndName={
            images
              ? images
              : data?.data.images?.map((i) => ({
                  url: i,
                  name: data.data.title,
                }))
          }
          removeImage={(imageIndex: number) => {
            const savedFiles = getValues('images') || [];

            if (savedFiles.length > 0) {
              const filteredImages = savedFiles.filter(
                (_i, idx) => idx !== imageIndex
              );

              setValue('images', filteredImages, { shouldValidate: true });
              trigger('images');
              onImageChange(filteredImages);
            }
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;
            const savedFiles = getValues('images') || [];

            if (!files) return;

            const newImages = [...savedFiles, ...Array.from(files)];

            setValue('images', newImages, { shouldValidate: true });
            trigger('images');
            onImageChange(newImages);
          }}
        />
        {!getCategoriesLoading && (
          <SelectInput
            name="category"
            label="Category"
            control={control}
            options={
              categories?.data
                ? categories?.data.map((s) => ({
                    value: s._id,
                    label: s.name,
                  }))
                : []
            }
            error={errors.category?.message}
            multiple={false}
          />
        )}
        {!getBrandsLoading && (
          <SelectInput
            label="Brand"
            name="brand"
            control={control}
            options={
              brands?.data
                ? brands?.data.map((s) => ({
                    value: s._id,
                    label: s.name,
                  }))
                : []
            }
            error={errors.brand?.message}
            multiple={false}
          />
        )}
        {!getSubCategoriesLoading && (
          <SelectInput
            name="subcategories"
            label="Subcategories"
            control={control}
            options={
              subCategories?.data
                ? subCategories?.data.map((s) => ({
                    value: s._id,
                    label: s.name,
                  }))
                : []
            }
            error={errors.subcategories?.message}
            multiple={true}
          />
        )}
        <Button variant="primary" type="submit">
          {addProductLoading || updateProductLoading ? (
            <>
              <Spinner animation="border" size="sm"></Spinner> Loading ...
            </>
          ) : (
            `${recordId ? 'Update' : 'Add'} Product `
          )}
        </Button>
        {addProductError && <ErrorMessage error={addProductError} />}
        {updateProductError && <ErrorMessage error={updateProductError} />}
        {getProductError && <ErrorMessage error={getProductError} />}
        {getCategoriesError && <ErrorMessage error={getCategoriesError} />}
        {getBrandsError && <ErrorMessage error={getBrandsError} />}
        {getSubCategoriesError && (
          <ErrorMessage error={getSubCategoriesError} />
        )}
      </Form>
    </div>
  );
};

export default AddProductForm;
