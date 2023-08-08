import { Input } from "antd";
import { Control, Controller } from "react-hook-form";

interface Props {
  control: Control<any>;
  label?: string;
  name: string;
  type: "text" | "email" | "password" | "url";
  errors: { [key: string]: any };
  placeholder?: string;
  autoComplete?: "on" | "off";
  required?: boolean;
  defaultValue?: string;
  suffix?: React.ReactNode;
  prefix?:  React.ReactNode;
}

const TextInput: React.FC<Props> = ({
  control,
  prefix,
  label = "",
  type,
  name,
  errors,
  placeholder = "",
  defaultValue,
  autoComplete,
  required,
  suffix,
}) => {
  return (
    <>
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={name}
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input
            size="large"
            type={type}
            id={name}
            suffix={suffix}
            required={required}
            placeholder={placeholder}
            autoComplete={autoComplete}
            status={errors?.[name]?.message ? "error" : ""}
            prefix={prefix}
            {...field}
          />
        )}
      />
      {errors?.[name] && (
        <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
          {errors?.[name]?.message}
        </span>
      )}
    </>
  );
};

export { TextInput };
