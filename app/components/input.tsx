import clsx from "clsx";
import { forwardRef, useId } from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, hasError, ...delegated }, ref) => {
    return (
      <input
        ref={ref}
        type="text"
        className={clsx(className, "input-bordered input w-full max-w-sm", {
          "input-error": hasError,
        })}
        {...delegated}
      />
    );
  }
);
Input.displayName = "Input";

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ className, ...delegated }: LabelProps) {
  return <label className={clsx(className, "label-text")} {...delegated} />;
}

type FormControlProps = React.HTMLAttributes<HTMLDivElement>;

export function FormControl({ className, ...delegated }: FormControlProps) {
  return <div className={clsx(className, "form-control")} {...delegated} />;
}

type ErrorMessageProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export function ErrorMessage({
  className,
  children,
  ...delegated
}: ErrorMessageProps) {
  return children ? (
    <label
      className={clsx(className, "label-text-alt text-error")}
      {...delegated}
    >
      {children}
    </label>
  ) : null;
}

function useFieldId(id: string | undefined) {
  const generatedId = useId();
  return id || generatedId;
}

export type InputFieldProps = Omit<InputProps, "hasError"> & {
  label: string;
  error?: ErrorMessageProps["children"];
};

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ error, label, id, ...inputProps }, ref) => {
    const forId = useFieldId(id);
    return (
      <FormControl>
        <Label htmlFor={forId}>{label}</Label>
        <Input ref={ref} hasError={Boolean(error)} id={forId} {...inputProps} />
        <ErrorMessage>{error}</ErrorMessage>
      </FormControl>
    );
  }
);
InputField.displayName = "InputField";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...delegated }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          className,
          "textarea-bordered textarea w-full max-w-sm"
        )}
        {...delegated}
      />
    );
  }
);
Textarea.displayName = "Textarea";

type TextareaFieldProps = Omit<TextareaProps, "hasError"> & {
  label: string;
  error: ErrorMessageProps["children"];
};

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(({ error, label, id, ...textareaProps }, ref) => {
  const forId = useFieldId(id);
  return (
    <FormControl>
      <Label htmlFor={forId}>{label}</Label>
      <Textarea ref={ref} id={forId} {...textareaProps} />
      <ErrorMessage>{error}</ErrorMessage>
    </FormControl>
  );
});
TextareaField.displayName = "TextareaField";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
};

export function Select({ className, hasError, ...delegated }: SelectProps) {
  return (
    <select
      className={clsx(className, "select-bordered select w-full max-w-sm", {
        "input-error": hasError,
      })}
      {...delegated}
    />
  );
}

type SelectFieldProps = Omit<SelectProps, "hasError"> & {
  label: string;
  error: ErrorMessageProps["children"];
};

export function SelectField({
  error,
  label,
  id,
  ...selectProps
}: SelectFieldProps) {
  const forId = useFieldId(id);
  return (
    <FormControl>
      <Label htmlFor={forId}>{label}</Label>
      <Select hasError={Boolean(error)} id={forId} {...selectProps} />
      <ErrorMessage>{error}</ErrorMessage>
    </FormControl>
  );
}

type MetaInputProps = {
  name: string;
  value?: number | string;
};

export const MetaInput = forwardRef<HTMLInputElement, MetaInputProps>(
  (delegated, ref) => {
    return <input ref={ref} type="hidden" readOnly hidden {...delegated} />;
  }
);
MetaInput.displayName = "MetaInput";

type SubmitButtonProps = {
  idle: string;
  submitting: string;
  isSubmitting: boolean;
};

export function SubmitButton({
  idle,
  submitting,
  isSubmitting,
}: SubmitButtonProps) {
  return (
    <button type="submit" className="btn" disabled={isSubmitting}>
      {isSubmitting ? submitting : idle}
    </button>
  );
}
