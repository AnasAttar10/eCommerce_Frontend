import { Form } from 'react-bootstrap';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
type TInput<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  data: { _id: string; name: string }[];
  error?: string;
  control: Control<T>;
  flexDirection?: 'row' | 'column';
};
const CheckboxInput = <T extends FieldValues>({
  label,
  name,
  error,
  data,
  control,
  flexDirection,
}: TInput<T>) => {
  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label className="d-block">{label}</Form.Label>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value = [] } }) => {
            const selectedValues: string[] = Array.isArray(value) ? value : [];
            return (
              <div
                style={{
                  display: 'flex',
                  flexDirection: flexDirection ?? 'row',
                }}
              >
                {data &&
                  data?.length > 0 &&
                  data.map((b) => {
                    const isChecked = selectedValues.includes(b._id);
                    return (
                      <Form.Check
                        key={b._id}
                        inline
                        label={b.name}
                        type="checkbox"
                        id={b._id}
                        value={b._id}
                        checked={isChecked}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          onChange(
                            isChecked
                              ? value.filter((id: string) => id !== newValue)
                              : [...value, newValue]
                          );
                        }}
                      />
                    );
                  })}
              </div>
            );
          }}
        />
        {error && <p style={{ color: '#E65B45' }}>{error}</p>}
      </Form.Group>
    </>
  );
};

export default CheckboxInput;
