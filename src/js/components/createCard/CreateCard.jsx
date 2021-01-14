import React from "react";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";

const CreateCard = () => {
  return (
    <form autoComplete="off">
      <TextField label="Name" variant="outlined" />
      <FormControl variant="outlined">
        <InputLabel>Age</InputLabel>
        <Select value="Kuski" label="Card type">
          <MenuItem value="Kuski">Kuski</MenuItem>
          <MenuItem value="Level">Level</MenuItem>
          <MenuItem value="Instant">Instant</MenuItem>
        </Select>
      </FormControl>
    </form>
  );
};

export default CreateCard;
