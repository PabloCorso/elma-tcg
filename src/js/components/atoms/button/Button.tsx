import React from "react";
import MuiButton, { ButtonProps } from "@material-ui/core/Button";
import { CircularProgress } from "@material-ui/core";

type Props = { isLoading?: boolean } & ButtonProps;

const Button: React.FC<Props> = ({ isLoading = false, children, ...props }) => (
  <MuiButton variant="contained" color="primary" {...props}>
    {isLoading && <CircularProgress color="inherit" size={24} />}
    {!isLoading && children}
  </MuiButton>
);

export default Button;
