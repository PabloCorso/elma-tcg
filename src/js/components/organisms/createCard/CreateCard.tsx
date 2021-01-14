import React from "react";
import { TextField, SelectField } from "../../atoms";
import TextFieldAutocomplete from "../../atoms/textFieldAutocomplete";
import "./createCard.css";

const cardTypes = [
  { value: "Kuski", label: "Kuski" },
  { value: "Level", label: "Level" },
  { value: "Instant", label: "Instant" },
];

const types = [
  { value: "Moporator", label: "Moporator" },
  { value: "Long cruise", label: "Long cruise" },
  { value: "Hoyla", label: "Hoyla" },
];

const gameSetNames = [{ value: "Alpha", label: "Alpha" }];

const CreateCard = () => {
  return (
    <form autoComplete="off" className="create-card">
      <TextField label="Name" />
      <SelectField label="Card type" value="Kuski" options={cardTypes} />
      <TextFieldAutocomplete label="Type 1" options={types} />
      <TextFieldAutocomplete label="Type 2" options={types} />
      <TextField label="PR 1" type="number" />
      <TextField label="PR 2" type="number" />
      <TextField label="PR 3" type="number" />
      <TextField label="PR 4" type="number" />
      <TextField label="PR 5" type="number" />
      <TextField label="PR 6" type="number" />
      <TextField label="Battle min length" type="number" />
      <TextField label="Battle max length" type="number" />
      <SelectField label="Set name" value="Alpha" options={gameSetNames} />
    </form>
  );
};

export default CreateCard;
