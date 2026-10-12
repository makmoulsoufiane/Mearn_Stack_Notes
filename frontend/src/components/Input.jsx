import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className = "",
      inputClassName = "",
      id,
      name,
      type = "text",
      ...props
    },
    ref,
  ) => {
    const inputId = id || name;

    const statusClass = error
      ? "input-error focus:outline-error"
      : "focus:outline-primary";

    return (
      <label className={`form-control w-full ${className}`} htmlFor={inputId}>
        {label && (
          <div className="label pb-1">
            <span className="label-text font-medium text-base-content">
              {label}
            </span>
          </div>
        )}

        <div
          className={`input input-bordered flex h-12 items-center gap-2 bg-base-200/70 transition-colors ${statusClass} ${inputClassName}`}
        >
          {leftIcon && (
            <span className="text-base-content/50" aria-hidden="true">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            className="w-full min-w-0 bg-transparent text-base-content placeholder:text-base-content/40 focus:outline-none"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            {...props}
          />

          {rightIcon && (
            <span className="text-base-content/50" aria-hidden="true">
              {rightIcon}
            </span>
          )}
        </div>

        {(error || helperText) && (
          <div className="label pt-1">
            <span
              id={error ? `${inputId}-error` : `${inputId}-helper`}
              className={`label-text-alt ${error ? "text-error" : "text-base-content/60"}`}
            >
              {error || helperText}
            </span>
          </div>
        )}
      </label>
    );
  },
);

Input.displayName = "Input";

export default Input;
