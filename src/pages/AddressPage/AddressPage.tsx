import { Heading } from '@components/common';
import AddressContainer from '@components/eCommerce/AddressContainer/AddressContainer';
import AddressForm from '@components/forms/AddressForm';

import { useGetLoggedUserAddressesQuery } from '@store/address/addressApi';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

const AddressPage = () => {
  const { data } = useGetLoggedUserAddressesQuery();
  const [showAddressForm, setShowAddressForm] = useState(false);
  const handleShowForm = (status: boolean) => {
    setShowAddressForm(status);
  };
  if (showAddressForm) return <AddressForm handleShowForm={handleShowForm} />;
  return (
    <div className="position-relative">
      <Heading title="addresses" />
      <Button
        className="position-absolute top-0 end-0"
        variant="secondary"
        type="button"
        onClick={() => handleShowForm(true)}
      >
        Add New Address
      </Button>
      {data?.data.map((add) => <AddressContainer key={add._id} {...add} />)}
    </div>
  );
};

export default AddressPage;
