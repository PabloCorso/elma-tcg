import React from "react";
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectProps,
} from "@material-ui/core";
import { Option } from "../types";

type Props = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
} & Omit<SelectProps, "onChange">;

const SelectField: React.FC<Props> = ({
  label,
  value,
  options,
  onChange,
  ...selectProps
}) => (
  <FormControl variant="outlined">
    <InputLabel>{label}</InputLabel>
    <Select
      value={value}
      label={label}
      {...selectProps}
      onChange={(event) => {
        onChange(event.target.value as string);
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectField;
