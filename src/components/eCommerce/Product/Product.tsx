import { Button, Spinner } from 'react-bootstrap';
import styles from './styles.module.css';
import { TProduct } from '@types';
import { memo, useState } from 'react';
import LikeFill from '@assets/svg/like-fill.svg?react';
import Like from '@assets/svg/like.svg?react';
import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import { useRemoveProductMutation } from '@store/Product/productsApi';
import { Link } from 'react-router-dom';
import { MdAddShoppingCart } from 'react-icons/md';
import ModalB from '@components/feedback/Modal/ModalB';
import useRemovingMessage from '@hooks/useRemovingMessage';
import useCartItems from '@hooks/useCartItems';
import useWishlistItems from '@hooks/useWishlistItems';
const {
  product,
  productImg,
  maximumNotice,
  wishlistBtn,
  colorContainer,
  colorWrapper,
  activeColor,
  mourningRibbon,
} = styles;
const Product = memo(
  ({
    _id,
    title,
    price,
    priceAfterDiscount,
    colors,
    imageCover,
    showLikeIcon = true,
    isLiked,
    showButton = true,
    quantity,
    showQuantity = false,
    showEditAndRemoveIcons = false,
    showColors = true,
    handleEdit,
  }: TProduct & {
    showLikeIcon?: boolean;
    isLiked?: boolean;
    showButton?: boolean;
    showQuantity?: boolean;
    showColors?: boolean;
    handleEdit?: (id: string) => void;
    showEditAndRemoveIcons?: boolean;
  }) => {
    const {
      showRemovingMessage,
      setShowRemovingMessage,
      selectedElement,
      handleRemovingMessage,
    } = useRemovingMessage();
    const [
      removeProduct,
      { isLoading: removeProductLoading, error: removeProductError },
    ] = useRemoveProductMutation();
    const isMax = quantity <= 0;
    const { handleAddToCart, addProductToCartLoading } = useCartItems();
    const {
      handleLikeToggle,
      addProductToWishlistLoading,
      removeFromWishlistLoading,
    } = useWishlistItems();

    const [currentColor, setCurrentColor] = useState<string | undefined>(
      undefined
    );
    let isSelectColor;
    if (colors && colors?.length > 0) {
      if (colors?.length == 1) {
        isSelectColor = true;
      } else if (currentColor) isSelectColor = true;
      else isSelectColor = false;
    } else isSelectColor = true;

    const handleSelectColor = (
      e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
      color: string
    ) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentColor(color);
    };

    const handleOnRemove = async () => {
      if (selectedElement) {
        await removeProduct(selectedElement);
        setShowRemovingMessage(false);
      }
    };
    return (
      <div className={product}>
        <ModalB
          show={showRemovingMessage}
          title={'Remove Product'}
          message={`Are you sure you want to remove this product`}
          handleClose={() => setShowRemovingMessage(false)}
          handleSave={handleOnRemove}
        />
        {showLikeIcon && (
          <div
            className={wishlistBtn}
            onClick={() => handleLikeToggle(_id, isLiked ?? false)}
          >
            {addProductToWishlistLoading || removeFromWishlistLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
        )}
        <Link to={`/product/${_id}`}>
          <div className={productImg}>
            <img src={imageCover} alt={title} loading="lazy" />
          </div>
          <h2 title={title}>{title}</h2>
          <div style={{ display: 'flex', gap: '5px' }}>
            {Number(priceAfterDiscount) > 1 && (
              <h3>
                {priceAfterDiscount}
                <span style={{ fontSize: '18px' }}>₪</span>
              </h3>
            )}
            {price && (
              <h3>
                <span
                  style={{
                    textDecoration: priceAfterDiscount
                      ? 'line-through'
                      : 'none',
                  }}
                >
                  {price}
                </span>
                <span style={{ fontSize: '18px' }}>₪</span>
              </h3>
            )}
          </div>
          {showColors && colors && colors?.length > 0 && (
            <div className={colorContainer}>
              colors:
              {colors?.map((color) => (
                <span
                  key={Math.random()}
                  className={`${colorWrapper} ${color === currentColor ? activeColor : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={(e) => handleSelectColor(e, color)}
                ></span>
              ))}
              {!isSelectColor && (
                <p style={{ color: 'red', fontSize: '10px' }}>
                  Please choose your preferred color.{' '}
                </p>
              )}
            </div>
          )}

          <>
            {quantity <= 0 ? (
              <div className={mourningRibbon}>
                <h3 className={maximumNotice}>NOT AVAILABLE </h3>
              </div>
            ) : (
              showQuantity && <h3>Quantity : {quantity} </h3>
            )}
          </>
        </Link>
        {showButton && (
          <Button
            variant="info"
            style={{ color: 'white' }}
            onClick={() => handleAddToCart(_id, currentColor)}
            disabled={addProductToCartLoading || isMax}
          >
            {addProductToCartLoading ? (
              <>
                <Spinner animation="border" size="sm" /> Loading ...{' '}
              </>
            ) : (
              <div>
                Add to cart {'  '} <MdAddShoppingCart size={20} />
              </div>
            )}
          </Button>
        )}
        {showEditAndRemoveIcons && (
          <>
            <div className="d-flex justify-content-center mt-1 gap-2">
              <div
                onClick={() => handleEdit && handleEdit(_id)}
                style={{ cursor: 'pointer' }}
              >
                <FaRegEdit />
              </div>
              <div
                onClick={() => handleRemovingMessage(_id)}
                style={{ cursor: 'pointer' }}
              >
                {removeProductLoading ? (
                  <>
                    <Spinner animation="border" size="sm"></Spinner>
                  </>
                ) : (
                  <FaRegTrashAlt />
                )}
              </div>
            </div>
            {removeProductError && <ErrorMessage error={removeProductError} />}
          </>
        )}
      </div>
    );
  }
);

export default Product;
