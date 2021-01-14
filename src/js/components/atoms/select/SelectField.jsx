import React from "react";
import PropTypes from "prop-types";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";

const SelectField = ({ label, value, options }) => (
  <FormControl variant="outlined">
    <InputLabel>{label}</InputLabel>
    <Select value={value} label={label}>
      {options.map((option) => (
        <MenuItem value={option.value}>{option.label}</MenuItem>
      ))}
    </Select>
  </FormControl>
);

SelectField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.string,
};

export default SelectField;
