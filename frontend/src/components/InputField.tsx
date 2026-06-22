type InputFieldProps = {
  label: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
  autoFocus?: boolean;
  id?: string;
};

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  min,
  autoFocus = false,
  id,
}: InputFieldProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label htmlFor={inputId} className="field-label">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        min={min}
        autoFocus={autoFocus}
        className="field-input"
      />
    </div>
  );
}
