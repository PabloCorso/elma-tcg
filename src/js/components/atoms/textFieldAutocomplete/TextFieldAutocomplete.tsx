import React from "react";
import TextField from "../textField";
import { Autocomplete } from "@material-ui/lab";
import { Option } from "../types";

type Props = {
  label: string;
  value: string | Option;
  options: Option[];
  onChange: (value: string) => void;
};

const TextFieldAutocomplete: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
}) => (
  <Autocomplete
    freeSolo
    options={options}
    value={value}
    getOptionLabel={(option: Option | string) =>
      typeof option === "string" ? option : option.label
    }
    renderInput={(params) => (
      <TextField
        {...params}
        label={label}
        onChange={(value) => {
          onChange(value);
        }}
      />
    )}
    onChange={(_event, selectedValue) => {
      const value =
        typeof selectedValue === "string" ? selectedValue : selectedValue.value;
      onChange(value);
    }}
  />
);

export default TextFieldAutocomplete;
