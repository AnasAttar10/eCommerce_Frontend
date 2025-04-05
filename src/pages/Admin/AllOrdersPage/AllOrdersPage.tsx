import { Heading } from '@components/common';
import PaginationComponent from '@components/common/PaginationComponent/PaginationComponent';
import { Product } from '@components/eCommerce';
import ErrorMessage from '@components/feedback/ErrorMessage/ErrorMessage';
import Loading from '@components/feedback/Loading/Loading';
import ModalB from '@components/feedback/Modal/ModalB';
import SearchInput from '@components/forms/SearchInput/SearchInput';
import SwitchInput from '@components/forms/SwitchInput/SwitchInput';
import useQueryString from '@hooks/useProductsQueryString';
import useRemovingMessage from '@hooks/useRemovingMessage';
import useSearchInput from '@hooks/useSearchInput';
import {
  useGetAllOrdersQuery,
  useRemoveOrderMutation,
  useUpdateOrderToDeliveredMutation,
  useUpdateOrderToPaidMutation,
} from '@store/order/orderApi';
import { TOrder } from '@types';
import { formatDate } from '@util/date';
import { useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const limit = 10;
const AllOrdersPage = () => {
  const { searchValue, handleOnSearch } = useSearchInput();

  const { handlePageChange, currentPage, stringQueryResult, isSendRequest } =
    useQueryString(limit, undefined, undefined, searchValue);
  console.log(isSendRequest);

  const { data, isLoading, error } = useGetAllOrdersQuery(stringQueryResult, {
    skip: isSendRequest,
  });
  const [show, setShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<TOrder | undefined>(
    undefined
  );
  const {
    showRemovingMessage,
    setShowRemovingMessage,
    selectedElement,
    handleRemovingMessage,
  } = useRemovingMessage();
  const [updateOrderToDelivered, { error: toDError }] =
    useUpdateOrderToDeliveredMutation();
  const [updateOrderToPaid, { error: toPError }] =
    useUpdateOrderToPaidMutation();
  const [removeOrder, { error: removeOrderError }] = useRemoveOrderMutation();
  const modalMessage = (
    <>
      <div style={{ marginBottom: '10px' }}>
        <b>
          <p>User Information : - </p>
        </b>
        <p>name : {selectedOrder?.user.name}</p>
        <p>phone :{selectedOrder?.user.phone}</p>
        <p>email : {selectedOrder?.user.email}</p>
        <hr />
        <b>
          <p>Address : - </p>
        </b>
        <p>city : {selectedOrder?.shippingAddress?.city}</p>
        <p>alias : {selectedOrder?.shippingAddress?.alias}</p>
        <p>postalCode :{selectedOrder?.shippingAddress?.postalCode}</p>
        <p>phone : {selectedOrder?.shippingAddress?.phone}</p>
      </div>
      <hr />
      <b>
        <p>products : - </p>
      </b>
      {selectedOrder?.cartItems.map((el) => (
        <div style={{ marginBottom: '10px' }} key={el._id}>
          <Product
            key={el._id}
            _id={el._id}
            title={el.product.title}
            category={el.product.category}
            description={el.product.description}
            imageCover={el.product.imageCover}
            price={el.price}
            colors={[el.color]}
            quantity={el.quantity}
            showButton={false}
            showLikeIcon={false}
            showQuantity={true}
          />
        </div>
      ))}
    </>
  );
  const handleViewOrder = (id: string) => {
    const selectedOrder = data && data.data?.find((el) => el._id === id);
    if (selectedOrder) {
      setSelectedOrder(selectedOrder);
      setShow(true);
    }
  };
  // const handleRemovingOrderMessage = (id: string | undefined) => {
  //   if (id) {
  //     setSelectedOrder2(id);
  //     setShow2(true);
  //   }
  // };
  const handleIsDelivered = (id: string) => {
    updateOrderToDelivered(id);
  };

  const handleIsPaid = (id: string) => {
    updateOrderToPaid(id);
  };
  const handleOnRemove = async () => {
    if (selectedElement) {
      await removeOrder(selectedElement);
      setShowRemovingMessage(false);
    }
  };
  return (
    <>
      <ModalB
        title="Order Details"
        show={show}
        handleClose={() => setShow(false)}
        message={modalMessage}
        showButtons={false}
        height="70vh"
      />
      <ModalB
        show={showRemovingMessage}
        title={'Remove Order'}
        message={`Are you sure you want to remove this order`}
        handleClose={() => setShowRemovingMessage(false)}
        handleSave={handleOnRemove}
      />
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Heading title="Orders" />
          <div className="w-100 w-sm-75 w-md-50 w-lg-50">
            <SearchInput
              handleOnSearch={handleOnSearch}
              placeholder="Search by user's email"
            />
          </div>
        </div>
        <Loading
          isLoading={isLoading}
          error={error || toDError || toPError}
          type="table"
        >
          <Table>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Items</th>
                <th> Type</th>
                <th>is Delivered</th>
                <th>is Paid</th>
                <th>Delivered At</th>
                <th>Paid At</th>
                <th>Total Price</th>
                <th>Details</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.data?.map((el) => (
                  <tr key={el._id}>
                    <td>#{el._id}</td>
                    <td>{el.cartItems.length}</td>
                    <td>{el.paymentMethodType}</td>
                    <td>
                      <SwitchInput
                        defaultChecked={el.isDelivered}
                        onChange={() => handleIsDelivered(el._id)}
                      />
                    </td>
                    <td>
                      <SwitchInput
                        defaultChecked={el.isPaid}
                        onChange={() => handleIsPaid(el._id)}
                      />
                    </td>

                    <td>
                      {el.deliveredAt
                        ? formatDate(new Date(el.deliveredAt).toISOString())
                        : '-'}
                    </td>
                    <td>
                      {el.paidAt
                        ? formatDate(new Date(el.paidAt).toISOString())
                        : '-'}
                    </td>
                    <td>
                      {el.totalOrderPrice.toFixed(2)}{' '}
                      <span style={{ fontSize: '18px' }}>₪</span>
                    </td>
                    <td>
                      <p
                        onClick={() => handleViewOrder(el._id)}
                        style={{
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                      >
                        Details
                      </p>
                    </td>
                    <td style={{ textAlign: 'center', cursor: 'pointer' }}>
                      <FaTrash
                        size={20}
                        color="red"
                        onClick={() => handleRemovingMessage(el._id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Loading>
      </Container>
      {removeOrderError && <ErrorMessage error={removeOrderError} />}
      <PaginationComponent
        currentPage={currentPage}
        onPageChange={handlePageChange}
        numOfPages={data?.paginationResult?.numOfPages ?? 1}
      />
    </>
  );
};

export default AllOrdersPage;
