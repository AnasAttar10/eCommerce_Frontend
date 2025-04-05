import { Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './customDatePickerWidth.css';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
type TInput<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  date?: Date | null;
  error?: string;
  onChangeDate: (date: Date | null) => void;
  control: Control<T>;
};
const DateInput = <T extends FieldValues>({
  label,
  name,
  error,
  onChangeDate,
  control,
}: TInput<T>) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label className="d-block">{label}</Form.Label>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <div className="customDatePickerWidth">
              <DatePicker
                selected={field.value}
                onChange={(date) => {
                  field.onChange(date); // Updates react-hook-form state
                  onChangeDate(date); // Updates local state
                }}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                showYearDropdown
                scrollableYearDropdown
                className="form-control"
              />
            </div>
          )}
        />
        {error && <p style={{ color: '#E65B45' }}>{error}</p>}
      </Form.Group>
    </>
  );
};

export default DateInput;
