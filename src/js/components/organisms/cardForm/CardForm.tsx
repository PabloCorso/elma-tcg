import React, { ClipboardEvent, useEffect, useState } from "react";
import { CardType, CardTypeEnum, Rarity, EffectType } from "server/models";
import { SaveCardResult } from "../../../../../server/routes/cardRoutes";
import { apiCards, apiEffects } from "../../../api";
import {
  TextField,
  SelectField,
  Button,
  TextFieldAutocomplete,
} from "../../atoms";
import AddCardEffects from "./addCardEffects";
import "./cardForm.css";

const cardTypes = [
  { value: "Kuski", label: "Kuski" },
  { value: "Level", label: "Level" },
  { value: "Instant", label: "Instant" },
];

const battleLengthOptions = [{ value: "", label: "None" }].concat(
  new Array(6).fill(null).map((value, index) => {
    value = index + 1;
    return { value, label: value };
  })
);

const rarityOptions = [
  { value: "C", label: "Common" },
  { value: "U", label: "Uncommon" },
  { value: "R", label: "Rare" },
];

type PrNames = "pr1" | "pr2" | "pr3" | "pr4" | "pr5" | "pr6";
const prIndices = [1, 2, 3, 4, 5, 6];

const stringToNumber = (value: string) => (value ? Number(value) : null);
const numberToString = (value: number) => (value ? value + "" : "");

type ValuesMap = { [key: string]: string[] };
type EffectsMap = { [key: string]: EffectType[] };

type Props = {
  card: CardType;
  onChange: (card: Partial<CardType>) => void;
  onSave: (card: CardType) => Promise<SaveCardResult>;
};

const CardForm: React.FC<Props> = ({ card, onChange, onSave }) => {
  const [existingTypes, setExistingTypes] = useState<ValuesMap>({});
  const [existingEffects, setExistingEffects] = useState<EffectsMap>({});
  const [showAllEffects, setShowAllEffects] = useState(false);

  const [isSavingCard, setIsSavingCard] = useState(false);
  const [saveResult, setSaveResult] = useState<SaveCardResult>({});

  useEffect(() => {
    const getEffects = async () => {
      const response = await apiEffects.getAll();
      setExistingEffects(response);
    };

    const getTypes = async () => {
      const response = await apiCards.getTypes();
      setExistingTypes(response);
    };

    getEffects();
    getTypes();
  }, []);

  const handleSave = async () => {
    setIsSavingCard(true);
    const result = await onSave(card);
    setIsSavingCard(false);
    setSaveResult(result || {});
  };

  const handleChange = (newValues: Partial<CardType>) => {
    setSaveResult({});
    onChange(newValues);
  };

  const onPastePrs = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const clipboardData = event.clipboardData as {
      getData: (option: string) => string;
    };
    const data = clipboardData.getData("Text");
    if (data) {
      const possiblePrs = data.split(">");
      for (let i = 0; i < possiblePrs.length; i++) {
        const pr = possiblePrs[i].trim();
        if (pr) {
          const prName = `pr${i + 1}` as PrNames;
          onChange({ [prName]: pr });
        }
      }
    }
  };

  const lineCardType = existingTypes[card.cardType] || [];
  const lineCardTypeOptions = lineCardType
    .filter((type) => type !== card.type1 && type !== card.type2)
    .map((type) => ({
      value: type,
      label: type,
    }));

  const effectOptions = showAllEffects
    ? Object.values(existingEffects).flat()
    : existingEffects[card.cardType];

  return (
    <>
      <form autoComplete="off" className="card-form">
        <section className="card-form__values">
          <TextField
            label="Name"
            value={card.name}
            onChange={(name) => {
              handleChange({ name });
            }}
          />
          <SelectField
            label="Card type"
            value={card.cardType}
            options={cardTypes}
            onChange={(cardType: CardTypeEnum) => {
              handleChange({ cardType });
            }}
          />
          <TextFieldAutocomplete
            label="Type 1"
            value={card.type1}
            options={lineCardTypeOptions}
            onChange={(type1) => {
              handleChange({ type1 });
            }}
          />
          <TextFieldAutocomplete
            label="Type 2"
            value={card.type2}
            options={lineCardTypeOptions}
            onChange={(type2) => {
              handleChange({ type2 });
            }}
          />
          {card.cardType === CardTypeEnum.KUSKI &&
            prIndices.map((index) => {
              const prName = `pr${index}` as PrNames;
              return (
                <TextField
                  key={prName}
                  label={`PR ${index}`}
                  type="number"
                  value={numberToString(card[prName])}
                  onChange={(value: string) => {
                    handleChange({ [prName]: stringToNumber(value) });
                  }}
                  onPaste={onPastePrs}
                />
              );
            })}
          {card.cardType === CardTypeEnum.LEVEL && (
            <>
              <SelectField
                label="Battle min length"
                value={numberToString(card.battleLengthMin)}
                options={battleLengthOptions}
                onChange={(value: string) => {
                  handleChange({
                    battleLengthMin: stringToNumber(value),
                  });
                }}
              />
              <SelectField
                label="Battle max length"
                value={numberToString(card.battleLengthMax)}
                options={battleLengthOptions}
                onChange={(value: string) => {
                  handleChange({
                    battleLengthMax: stringToNumber(value),
                  });
                }}
              />
            </>
          )}
          <SelectField
            label="Rarity"
            value={card.rarity}
            options={rarityOptions}
            onChange={(rarity: Rarity) => {
              handleChange({ rarity });
            }}
          />
        </section>
        <section className="card-form__flavor">
          <TextField
            multiline
            label="Flavor Text"
            value={card.flavorText}
            onChange={(flavorText) => {
              handleChange({ flavorText });
            }}
          />
        </section>
        <section className="card-form__effects">
          <AddCardEffects
            effects={card.effects}
            setEffects={(effects) => {
              handleChange({ effects });
            }}
            options={effectOptions}
            renderConfig={
              <span
                className="card-form__effects-config"
                onClick={() => {
                  setShowAllEffects((state) => !state);
                }}
              >
                {showAllEffects ? "Show all effects" : "Show same type effects"}
              </span>
            }
          />
        </section>
        <Button
          type="submit"
          className="card-form__submit"
          onClick={(event) => {
            event.preventDefault();
            handleSave();
          }}
          isLoading={isSavingCard}
        >
          {card.id ? "Save" : "Create"}
        </Button>
      </form>
      {saveResult.cardId && !isSavingCard && !saveResult.error && (
        <span className="card-form-result">
          ✔ Saved card with id: {saveResult.cardId}{" "}
          {saveResult.effectIds && saveResult.effectIds.length
            ? `(effect ids: ${saveResult.effectIds.join(", ")})`
            : ""}
        </span>
      )}
      {!isSavingCard && saveResult.error && (
        <span className="card-form-result">
          ❌ Error ocurred: {JSON.stringify(saveResult.error)}
        </span>
      )}
    </>
  );
};

export default CardForm;
