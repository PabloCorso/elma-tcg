import React, { ClipboardEvent, useEffect, useState } from "react";
import {
  CardType,
  CardTypeEnum,
  Rarity,
  Card,
  EffectType,
} from "server/models";
import { CreateCardResult } from "../../../../../server/routes/cardRoutes";
import { apiEffects } from "../../../api";
import {
  TextField,
  SelectField,
  Button,
  TextFieldAutocomplete,
} from "../../atoms";
import AddCardEffects from "./addCardEffects";
import "./createCard.css";

const cardTypes = [
  { value: "Kuski", label: "Kuski" },
  { value: "Level", label: "Level" },
  { value: "Instant", label: "Instant" },
];

const kuskiTypes = [
  { value: "Moporator", label: "Moporator" },
  { value: "Battler", label: "Battler" },
  { value: "Casual", label: "Casual" },
];

const levelTypes = [
  { value: "Long cruise", label: "Long cruise" },
  { value: "Hoyla", label: "Hoyla" },
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

type Props = {
  createCard: (card: CardType) => Promise<CreateCardResult>;
};

const CreateCard: React.FC<Props> = ({ createCard }) => {
  const [card, setCard] = useState<CardType>(Card({}));

  const [existingEffects, setExistingEffects] = useState<EffectType[]>([]);

  const [isCreatingCard, setIsCreatingCard] = useState(false);
  const [createRequested, setCreateRequested] = useState(false);
  const [createResult, setCreateResult] = useState<CreateCardResult>({});

  useEffect(() => {
    const getEffects = async () => {
      const response = await apiEffects.getAll();
      setExistingEffects(response);
    };

    getEffects();
  }, []);

  const handleCreate = async () => {
    setIsCreatingCard(true);
    setCreateRequested(true);
    const result = await createCard(card);
    setIsCreatingCard(false);
    console.log(result);
    setCreateResult(result || {});
  };

  const handleChange = (newValues: Partial<CardType>) => {
    setCreateRequested(false);
    setCard((state) => ({ ...state, ...newValues }));
  };

  const onPastePrs = (event: ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const data = event.clipboardData.getData("Text");
    if (data) {
      const possiblePrs = data.split(">");
      for (let i = 0; i < possiblePrs.length; i++) {
        const pr = possiblePrs[i].trim();
        if (pr) {
          const prName = `pr${i + 1}` as PrNames;
          setCard((state) => ({ ...state, [prName]: pr }));
        }
      }
    }
  };

  return (
    <>
      <h1 className="title">New card</h1>
      <form autoComplete="off" className="create-card">
        <section className="create-card__values">
          <TextField
            label="Name"
            value={card.name}
            onChange={(name) => {
              setCard((state) => ({ ...state, name }));
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
            options={getLineTypeCardTypes(card.cardType)}
            onChange={(type1) => {
              handleChange({ type1 });
            }}
          />
          <TextFieldAutocomplete
            label="Type 2"
            value={card.type2}
            options={getLineTypeCardTypes(card.cardType)}
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
        <section className="create-card__flavor">
          <TextField
            multiline
            label="Flavor Text"
            value={card.flavorText}
            onChange={(flavorText) => {
              handleChange({ flavorText });
            }}
          />
        </section>
        <section className="create-card__effects">
          <AddCardEffects
            effects={card.effects}
            setEffects={(effects) => {
              handleChange({ effects });
            }}
            options={existingEffects}
          />
        </section>
        <Button
          type="submit"
          className="create-card__submit"
          onClick={(event) => {
            event.preventDefault();
            handleCreate();
          }}
          isLoading={createRequested && isCreatingCard}
        >
          Create
        </Button>
      </form>
      {createRequested && !isCreatingCard && !createResult.error && (
        <span className="create-card-result">
          ✔ New card created with id: {createResult.cardId}{" "}
          {createResult.effectIds && createResult.effectIds.length
            ? `(effect ids: ${createResult.effectIds.join(", ")})`
            : ""}
        </span>
      )}
      {createRequested && !isCreatingCard && createResult.error && (
        <span className="create-card-result">
          ❌ Error ocurred: {JSON.stringify(createResult.error)}
        </span>
      )}
    </>
  );
};

const getLineTypeCardTypes = (cardType: CardTypeEnum) => {
  switch (cardType) {
    case CardTypeEnum.KUSKI:
      return kuskiTypes;
    case CardTypeEnum.LEVEL:
      return levelTypes;
    case CardTypeEnum.INSTANT:
    default:
      return [];
  }
};

export default CreateCard;
