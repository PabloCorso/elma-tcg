import React from "react";
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";

export type Props = Omit<TextFieldProps, "onChange"> & {
  onChange?: (value: string) => void;
};

const TextField: React.FC<Props> = ({ onChange, ...props }) => (
  <MuiTextField
    variant="outlined"
    {...props}
    onChange={(event) => {
      if (onChange) {
        onChange(event.target.value);
      }
    }}
  />
);

export default TextField;
