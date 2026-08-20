import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="input-wrapper">

      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}

      <input
        id={id}
        className={`custom-input ${className}`}
        {...props}
      />

      {error && (
        <span className="input-error">
          {error}
        </span>
      )}

    </div>
  );
}

export default Input;