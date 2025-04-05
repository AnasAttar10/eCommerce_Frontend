import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { MdArrowBack } from 'react-icons/md';
interface IGridListAndForm {
  children: React.ReactNode;
  FormProps: (handleCloseForm: () => void) => React.ReactNode;
  buttonText: string;
  recordId: string | null;
  resetRecordId: () => void;
}
const GridListAndForm = ({
  children,
  FormProps,
  buttonText,
  recordId,
  resetRecordId,
}: IGridListAndForm) => {
  const [showForm, setShowForm] = useState(false);
  const handleShowForm = (status: boolean) => {
    setShowForm(status);
  };
  const handleCloseForm = () => {
    handleShowForm(false);
    resetRecordId();
  };
  useEffect(() => {
    if (recordId) setShowForm(true);
    return () => setShowForm(false);
  }, [recordId]);

  if (showForm)
    return (
      <>
        <div
          style={{
            position: 'relative',
            padding: '10px',
          }}
        >
          <div
            style={{
              cursor: 'pointer',
              position: 'absolute',
              top: '5px',
              right: '10px',
            }}
            onClick={handleCloseForm}
          >
            <MdArrowBack size={20} />
          </div>
        </div>
        {FormProps && FormProps(handleCloseForm)}
      </>
    );
  return (
    <div>
      <div
        style={{
          width: 'max-content',
          marginLeft: 'auto',
          marginBottom: '10px',
          paddingRight: '25px',
        }}
      >
        <Button
          variant="secondary"
          type="button"
          onClick={() => handleShowForm(true)}
        >
          {buttonText}
        </Button>
      </div>

      {children}
    </div>
  );
};

export default GridListAndForm;
