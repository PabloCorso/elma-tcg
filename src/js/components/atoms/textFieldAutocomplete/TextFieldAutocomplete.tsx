import React from "react";
import TextField, { TextFieldProps } from "../textField";
import { Autocomplete } from "@material-ui/lab";
import { Option } from "../types";

type Props = TextFieldProps & { options: Option[] };

const TextFieldAutocomplete: React.FC<Props> = ({
  options,
  ...textFieldProps
}) => (
  <Autocomplete
    freeSolo
    options={options}
    getOptionLabel={(option: Option | string) =>
      typeof option === "string" ? option : option.label
    }
    renderInput={(params) => <TextField {...params} {...textFieldProps} />}
  />
);

export default TextFieldAutocomplete;
