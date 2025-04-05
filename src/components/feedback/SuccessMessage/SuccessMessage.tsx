const SuccessMessage = ({ message }: { message: string }) => {
  return (
    <div
      style={{
        color: 'white',
        backgroundColor: 'green',
        padding: '10px',
        borderRadius: '5px',
        margin: '10px 0',
      }}
    >
      {message}
    </div>
  );
};

export default SuccessMessage;
