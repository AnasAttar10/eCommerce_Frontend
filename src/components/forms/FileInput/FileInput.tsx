import { Button, Form } from 'react-bootstrap';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import uploadImage from '@assets/svg/uploadImage.svg';
import { IoMdClose } from 'react-icons/io';

type UploadedImage = {
  url: string;
  name: string;
};
type TInput<T extends FieldValues> = {
  inputId?: string;
  label: string;
  name: Path<T>;
  type?: string;
  error?: string;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  control: Control<T>;
  srcAndName: UploadedImage | UploadedImage[] | undefined;
  multiple: boolean;
  removeImage?: (index: number) => void;
};

const FileInput = <T extends FieldValues>({
  inputId,
  name,
  label,
  type = 'file',
  error,
  accept,
  control,
  onChange,
  removeImage,
  srcAndName = [],
  multiple,
}: TInput<T>) => {
  const renderImages = () => {
    if (srcAndName && Array.isArray(srcAndName) && srcAndName.length > 0) {
      return srcAndName.map((i, idx) => (
        <div
          key={idx}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              overflow: 'hidden',
              borderRadius: '5px',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              position: 'relative',
            }}
          >
            {removeImage && (
              <div
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                  backgroundColor: 'gray',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                }}
                onClick={() => removeImage(idx)}
              >
                <IoMdClose size={10} />
              </div>
            )}
            <img
              src={(i as UploadedImage).url}
              alt="Uploaded preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              onError={() => console.log('error')}
            />
          </div>
          <p
            style={{
              margin: '10px',
              width: '150px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textAlign: 'center',
            }}
          >
            {(i as UploadedImage).name}
          </p>
        </div>
      ));
    }
    return (
      <div
        style={{
          width: '100px',
          height: '100px',
          overflow: 'hidden',
          borderRadius: '5px',
        }}
      >
        <img
          src={uploadImage}
          alt="Upload Placeholder"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
    );
  };
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>{label}</Form.Label>
        <Controller
          name={name}
          control={control}
          render={() => (
            <>
              <div
                style={{
                  position: 'relative',
                  padding: '10px',
                  width: '100%',
                  maxHeight:
                    multiple &&
                    Array.isArray(srcAndName) &&
                    srcAndName.length > 0
                      ? '300px'
                      : 'auto',
                  borderRadius: '5px',
                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  overflow: 'auto',
                }}
              >
                {renderImages()}
                <Button
                  variant="primary"
                  onClick={() =>
                    inputId && document.getElementById(inputId!)?.click()
                  }
                  style={{ marginTop: '10px' }}
                >
                  Add Image
                </Button>
                <input
                  id={inputId}
                  type={type}
                  accept={accept}
                  onChange={onChange}
                  multiple={multiple}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    opacity: 0,
                    width: '1px',
                    height: '1px',
                  }}
                />
              </div>
            </>
          )}
        />
        {error && <p style={{ color: '#E65B45', padding: '5px 0' }}>{error}</p>}
      </Form.Group>
    </>
  );
};

export default FileInput;
