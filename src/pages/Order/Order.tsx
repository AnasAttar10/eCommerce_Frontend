import { Heading } from '@components/common';
import PaginationComponent from '@components/common/PaginationComponent/PaginationComponent';
import { Product } from '@components/eCommerce';
import Loading from '@components/feedback/Loading/Loading';
import ModalB from '@components/feedback/Modal/ModalB';
import useQueryString from '@hooks/useProductsQueryString';
import { useGetUserOrdersQuery } from '@store/order/orderApi';
import { TOrder } from '@types';
import { formatDate } from '@util/date';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
const limit = 10;
const Order = () => {
  const [show, setShow] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<TOrder | undefined>(
    undefined
  );
  const { handlePageChange, currentPage, stringQueryResult } = useQueryString(
    limit,
    undefined
  );
  const { data, isLoading, error } = useGetUserOrdersQuery(stringQueryResult);
  const modalMessage = (
    <>
      <div style={{ marginBottom: '10px' }}>
        <b>
          <p>Address : - </p>
        </b>
        <p>city : {selectedOrder?.shippingAddress?.city ?? '-'}</p>
        <p>alias : {selectedOrder?.shippingAddress?.alias ?? '-'}</p>
        <p>postalCode :{selectedOrder?.shippingAddress?.postalCode ?? '-'}</p>
        <p>phone : {selectedOrder?.shippingAddress?.phone ?? '-'}</p>
        <p>details : {selectedOrder?.shippingAddress?.details ?? '-'}</p>
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
            colors={el.color ? [el.color] : undefined}
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
  return (
    <>
      <ModalB
        title="Products Details"
        show={show}
        handleClose={() => setShow(false)}
        handleSave={() => console.log('anas')}
        message={modalMessage}
        showButtons={false}
        height="70vh"
      />
      <Heading title="My Order" />
      <Loading isLoading={isLoading} error={error} type="table">
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
            </tr>
          </thead>
          <tbody>
            {data &&
              data.data?.map((el) => (
                <tr key={el._id}>
                  <td>#{el._id}</td>
                  <td>{el.cartItems.length}</td>
                  <td>{el.paymentMethodType}</td>
                  <td>{el.isDelivered ? 'Yes' : 'No'}</td>
                  <td>{el.isPaid ? 'Yes' : 'No'}</td>
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
                  <td>{el.totalOrderPrice.toFixed(2)}</td>
                  <td>
                    <p
                      onClick={() => handleViewOrder(el._id)}
                      style={{ textDecoration: 'underline', cursor: 'pointer' }}
                    >
                      Details
                    </p>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Loading>

      <PaginationComponent
        currentPage={currentPage}
        onPageChange={handlePageChange}
        numOfPages={data?.paginationResult?.numOfPages ?? 1}
      />
    </>
  );
};

export default Order;
