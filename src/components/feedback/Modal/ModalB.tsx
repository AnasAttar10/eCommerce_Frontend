import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
interface IModal {
  show: boolean;
  title: string;
  message: React.ReactNode;
  handleClose: () => void;
  handleSave?: () => void;
  showButtons?: boolean;
  height?: string;
}
const ModalB = ({
  title,
  message,
  show,
  showButtons = true,
  handleClose,
  handleSave,
  height,
}: IModal) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{title} </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: height ?? 'auto', overflow: 'auto' }}>
        {message}
      </Modal.Body>
      {showButtons && (
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Confirm
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default ModalB;
