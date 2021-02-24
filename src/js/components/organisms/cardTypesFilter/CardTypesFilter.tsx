import React from "react";
import { Checkbox, FormGroup, FormControlLabel } from "@material-ui/core";
import {
  CardTypeEnum,
  getValuesByCardType,
  ValuesByCardType,
} from "../../../../../server/models";

export type ShownCardTypes = ValuesByCardType<boolean>;
export type CardTypesCount = ValuesByCardType<number>;

export const defaultShownCardTypes = getValuesByCardType(true);

type Props = {
  shownCardTypes: ShownCardTypes;
  cardTypesCount?: CardTypesCount;
  onChange: (values: ShownCardTypes) => void;
};

const CardTypesFilter: React.FC<Props> = ({
  shownCardTypes,
  cardTypesCount = {},
  onChange,
}) => {
  const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...shownCardTypes,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={shownCardTypes[CardTypeEnum.KUSKI]}
            onChange={handleCheck}
            name={CardTypeEnum.KUSKI}
            color="primary"
          />
        }
        label={`Kuskis ${
          cardTypesCount[CardTypeEnum.KUSKI]
            ? `(${cardTypesCount[CardTypeEnum.KUSKI]})`
            : ""
        }`}
      />
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={shownCardTypes[CardTypeEnum.LEVEL]}
            onChange={handleCheck}
            name={CardTypeEnum.LEVEL}
            color="primary"
          />
        }
        label={`Levels ${
          cardTypesCount[CardTypeEnum.LEVEL]
            ? `(${cardTypesCount[CardTypeEnum.LEVEL]})`
            : ""
        }`}
      />
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            checked={shownCardTypes[CardTypeEnum.INSTANT]}
            onChange={handleCheck}
            name={CardTypeEnum.INSTANT}
            color="primary"
          />
        }
        label={`Instants ${
          cardTypesCount[CardTypeEnum.INSTANT]
            ? `(${cardTypesCount[CardTypeEnum.INSTANT]})`
            : ""
        }`}
      />
    </FormGroup>
  );
};

export default CardTypesFilter;
