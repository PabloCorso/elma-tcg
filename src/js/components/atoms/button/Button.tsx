import React from "react";
import MuiButton, { ButtonProps } from "@material-ui/core/Button";

const Button: React.FC<ButtonProps> = (props) => (
  <MuiButton variant="contained" color="primary" {...props} />
);

export default Button;
