import { Form } from 'react-bootstrap';
import { Path, FieldValues, UseFormRegister } from 'react-hook-form';

type TInput<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  type?: string;
  as?: 'input' | 'textarea';
  register: UseFormRegister<T>;
  error?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  formText?: string;
  success?: string;
  disabled?: boolean;
  defaultValue?: string;
  placeholder?: string;
  accept?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const Input = <T extends FieldValues>({
  name,
  label,
  type = 'text',
  as = 'input',
  register,
  error,
  onBlur,
  formText,
  success,
  disabled,
  defaultValue,
  placeholder,
  accept,
  onChange,
}: TInput<T>) => {
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) {
      onBlur(e);
      register(name).onBlur(e);
    } else {
      register(name).onBlur(e);
    }
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
      register(name).onChange(e);
    } else {
      register(name).onChange(e);
    }
  };
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        as={as as React.ElementType}
        type={type}
        {...register(name)}
        onBlur={handleOnBlur}
        isInvalid={!!error}
        isValid={!!success}
        disabled={disabled}
        defaultValue={defaultValue}
        accept={accept}
        placeholder={placeholder}
        onChange={handleOnChange}
      />
      {error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
      {success && (
        <Form.Control.Feedback type="valid">{success}</Form.Control.Feedback>
      )}
      {formText && <Form.Text>{formText}</Form.Text>}
    </Form.Group>
  );
};

export default Input;
