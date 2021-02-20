import React from "react";
import TextField from "../textField";
import { Autocomplete } from "@material-ui/lab";
import { Option } from "../types";

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string, option?: Option) => void;
};

const TextFieldAutocomplete: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <Autocomplete
      freeSolo
      options={options}
      value={value}
      getOptionLabel={(option: Option | string) =>
        typeof option === "string" ? option : option.label
      }
      renderInput={(params) => <TextField {...params} label={label} />}
      onChange={(_event, selectedValue) => {
        if (typeof selectedValue === "string") {
          onChange(selectedValue);
        } else {
          const value = selectedValue ? selectedValue.value : "";
          onChange(value, selectedValue);
        }
      }}
    />
  );
};
export default TextFieldAutocomplete;
