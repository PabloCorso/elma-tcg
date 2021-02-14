import React from "react";
import { EffectType } from "server/models";
import { Button, TextField, TextFieldAutocomplete } from "../../../atoms";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownIcon from "@material-ui/icons/ArrowDownward";
import "./addCardEffects.css";

type Props = {
  effects: EffectType[];
  setEffects: (effects: EffectType[]) => void;
  options?: EffectType[];
};

const getEmptyEffect = () => ({
  id: 0,
  name: "",
  text: "",
  italicText: "",
});

const AddCardEffects: React.FC<Props> = ({
  effects,
  setEffects,
  options = [],
}) => {
  const handleChange = (effect: EffectType, index: number) => {
    const newEffects = [
      ...effects.slice(0, index),
      effect,
      ...effects.slice(index + 1),
    ];
    setEffects(newEffects);
  };

  const handleAdd = () => {
    setEffects([...effects, getEmptyEffect()]);
  };

  const handleDelete = (index: number) => {
    setEffects([...effects.slice(0, index), ...effects.slice(index + 1)]);
  };

  const handleMove = (index: number, isMoveUpwards: boolean) => {
    const otherEffects = [
      ...effects.slice(0, index),
      ...effects.slice(index + 1),
    ];
    const newIndex = isMoveUpwards ? index - 1 : index + 1;
    setEffects([
      ...otherEffects.slice(0, newIndex),
      effects[index],
      ...otherEffects.slice(newIndex),
    ]);
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      handleMove(index, true);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < effects.length - 1) {
      handleMove(index, false);
    }
  };

  return (
    <>
      {effects.map((effect, index) => (
        <section key={`${effect}-${index}`} className="add-effect-item">
          <header className="add-effect-header">
            <h3 className="add-effect-title">{`Effect ${index + 1}`}</h3>
            {index > 0 && (
              <ArrowUpIcon
                className="add-effect-action"
                onClick={() => {
                  handleMoveUp(index);
                }}
              />
            )}
            {index < effects.length - 1 && (
              <ArrowDownIcon
                className="add-effect-action"
                onClick={() => {
                  handleMoveDown(index);
                }}
              />
            )}
            <DeleteIcon
              className="add-effect-action"
              onClick={() => {
                handleDelete(index);
              }}
            />
          </header>
          <section className="add-effect-name">
            <TextFieldAutocomplete
              label="Effect name"
              value={effect.name}
              options={options.map((option) => ({
                value: option.id + "",
                label: option.name,
              }))}
              onChange={(name, option) => {
                const newValues = option
                  ? options.find((o) => o.id === Number(option.value))
                  : { name };
                handleChange({ ...effect, ...newValues }, index);
              }}
            />
          </section>
          <TextField
            multiline
            label="Text"
            value={effect.text}
            onChange={(text) => {
              handleChange({ ...effect, text }, index);
            }}
          />
          <TextField
            multiline
            label="Italic text"
            value={effect.italicText}
            onChange={(italicText) => {
              handleChange({ ...effect, italicText }, index);
            }}
          />
        </section>
      ))}
      <Button onClick={handleAdd}>Add effect +</Button>
    </>
  );
};

export default AddCardEffects;
