import { Form } from 'react-bootstrap';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import Select, { StylesConfig } from 'react-select';
import chroma from 'chroma-js';
type TDefaultOption = {
  value: string;
  label: string;
  color?: string;
};
type TSelectInput<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: TDefaultOption[];
  error: string | undefined;
  multiple: boolean;
  withStyle?: boolean;
};
const dot = (color = 'transparent') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colorStyles: StylesConfig<TDefaultOption> = {
  control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color || 'white');
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.3).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

const SelectInput = <T extends FieldValues>({
  control,
  label,
  name,
  multiple,
  options,
  error,
  withStyle = false,
}: TSelectInput<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, ref, value } }) => (
        <Form.Group className="mb-3">
          <Form.Label>{label}</Form.Label>
          <Select
            ref={ref}
            isMulti={multiple}
            options={options as TDefaultOption[]}
            value={
              multiple
                ? options.filter((option) =>
                    (value as string[])?.includes(option.value)
                  )
                : options.find((option) => option.value === value)
            }
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selected) => {
              onChange(
                multiple
                  ? (selected as TDefaultOption[]).map((opt) => opt.value)
                  : (selected as TDefaultOption)?.value
              );
            }}
            styles={withStyle ? colorStyles : undefined}
          />
          {error && (
            <p style={{ color: '#E65B45', padding: '5px 0' }}>{error}</p>
          )}
        </Form.Group>
      )}
    />
  );
};

export default SelectInput;
