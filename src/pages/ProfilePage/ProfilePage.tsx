import ChangePassword from '@components/Auth/ChangePassword';
import UpdateMeForm from '@components/forms/UpdateMeForm';
import { useGetMeQuery } from '@store/user/userApi';
import { useState } from 'react';
import { FaUserEdit } from 'react-icons/fa';

const Profile = () => {
  const { data: user, isLoading } = useGetMeQuery();

  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleShowForm = (status: boolean) => {
    setShowUpdateForm(status);
  };

  if (isLoading) return;

  if (showUpdateForm && user) {
    return <UpdateMeForm user={user} handleShowForm={handleShowForm} />;
  }

  return (
    <div style={{ position: 'relative' }}>
      <h2>Account Information </h2>
      <p>userName : {user?.data?.name}</p>
      {user?.data?.phone && <p>phone : {user?.data?.phone}</p>}
      <p>Email : {user?.data?.email}</p>
      <ChangePassword />
      <div
        style={{
          cursor: 'pointer',
          position: 'absolute',
          top: '10px',
          right: '10px',
        }}
        onClick={() => setShowUpdateForm(true)}
      >
        <FaUserEdit size={20} />
      </div>
    </div>
  );
};

export default Profile;
