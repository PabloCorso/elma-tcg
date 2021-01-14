import React from "react";
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";

export type Props = TextFieldProps;

const TextField: React.FC<Props> = (props) => (
  <MuiTextField variant="outlined" {...props} />
);

export default TextField;
