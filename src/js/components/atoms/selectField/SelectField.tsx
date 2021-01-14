import React from "react";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import { Option } from "../types";

type Props = {
  label: string;
  value: string;
  options: Option[];
};

const SelectField: React.FC<Props> = ({ label, value, options }) => (
  <FormControl variant="outlined">
    <InputLabel>{label}</InputLabel>
    <Select value={value} label={label}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default SelectField;
