import styles from './styles.module.css';
const { switchS, slider, round } = styles;
type TSwitchInput = {
  defaultChecked: boolean;
  onChange: () => void;
};
const SwitchInput = ({ defaultChecked, onChange }: TSwitchInput) => {
  return (
    <div>
      <label className={switchS}>
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          onChange={onChange}
        />
        <span className={`${slider} ${round}`}></span>
      </label>
    </div>
  );
};

export default SwitchInput;
