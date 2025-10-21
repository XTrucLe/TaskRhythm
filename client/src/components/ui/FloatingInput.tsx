interface FloatingInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  type?: "checkbox" | "radio";
}

export const FloatingInput: React.FC<FloatingInputProps> = ({
  label,
  error,
  className = "",
  type = "checkbox",
  ...props
}) => {
  return (
    <div className="relative z-0 w-full group">
      <div className="flex items-center ">
        <input
          className={` h-4 w-4 mr-2 outline-none ${className}`}
          type={type}
          placeholder=" "
          {...props}
        />
        <label htmlFor={props.id} className="text-md">
          {label}
        </label>
      </div>

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};
