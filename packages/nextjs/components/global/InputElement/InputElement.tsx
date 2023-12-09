export interface InputElementProps {
  name?: string;
  label?: string;
  topRightLabel?: string;
  bottomLeftLabel?: string;
  bottomRightLabel?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
const InputElement = (props: InputElementProps) => {
  const { label, topRightLabel, bottomLeftLabel, bottomRightLabel, onChange, name, value } = props;
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        {label && <span className="label-text">{label}</span>}
        {topRightLabel && <span className="label-text-alt">{topRightLabel}</span>}
      </div>
      <input
        type="text"
        placeholder={label}
        className="input input-bordered w-full max-w-xs"
        onChange={onChange}
        name={name}
        value={value}
      />
      <div className="label">
        {bottomLeftLabel && <span className="label-text-alt">{bottomLeftLabel}</span>}
        {bottomRightLabel && <span className="label-text-alt">{bottomRightLabel}</span>}
      </div>
    </label>
  );
};

export default InputElement;
