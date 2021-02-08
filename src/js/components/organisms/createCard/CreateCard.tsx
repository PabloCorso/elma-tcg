import React, { useState } from "react";
import { CardType, CardTypeEnum, Rarity, EffectType } from "server/models";
import { TextField, SelectField, Button } from "../../atoms";
import TextFieldAutocomplete from "../../atoms/textFieldAutocomplete";
import AddCardEffects from "./addCardEffects";
import "./createCard.css";

const cardTypes = [
  { value: "Kuski", label: "Kuski" },
  { value: "Level", label: "Level" },
  { value: "Instant", label: "Instant" },
];

const kuskiTypes = [{ value: "Moporator", label: "Moporator" }];

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

const gameSetNames = [{ value: "Alpha", label: "Alpha" }];

const rarityOptions = [
  { value: "C", label: "Common" },
  { value: "U", label: "Uncommon" },
  { value: "R", label: "Rare" },
];

type Props = {
  createCard: (card: CardType) => void;
};

const CreateCard: React.FC<Props> = ({ createCard }) => {
  const [name, setName] = useState("");
  const [cardType, setCardType] = useState(CardTypeEnum.KUSKI);
  const [type1, setType1] = useState("");
  const [type2, setType2] = useState("");
  const [pr1, setPr1] = useState("");
  const [pr2, setPr2] = useState("");
  const [pr3, setPr3] = useState("");
  const [pr4, setPr4] = useState("");
  const [pr5, setPr5] = useState("");
  const [pr6, setPr6] = useState("");
  const [battleLengthMin, setBattleLengthMin] = useState("");
  const [battleLengthMax, setBattleLengthMax] = useState("");
  const [gameSetName, setGameSetName] = useState(gameSetNames[0].value);
  const [rarity, setRarity] = useState(Rarity.COMMON);
  const [effects, setEffects] = useState<EffectType[]>([]);

  const onCreate = () => {
    console.log(
      name,
      cardType,
      type1,
      type2,
      pr1,
      pr2,
      pr3,
      pr4,
      pr5,
      pr6,
      battleLengthMin,
      battleLengthMax,
      gameSetName,
      rarity
    );
  };

  return (
    <>
      <h1 className="title">New card</h1>
      <form autoComplete="off" className="create-card">
        <section className="create-card__values">
          <TextField
            label="Name"
            value={name}
            onChange={(value) => {
              setName(value);
            }}
          />
          <SelectField
            label="Card type"
            value={cardType}
            options={cardTypes}
            onChange={(value) => {
              setCardType(value as CardTypeEnum);
            }}
          />
          <TextFieldAutocomplete
            label="Type 1"
            value={type1}
            options={getTypes(cardType)}
            onChange={(value) => {
              setType1(value);
            }}
          />
          <TextFieldAutocomplete
            label="Type 2"
            value={type2}
            options={getTypes(cardType)}
            onChange={(value) => {
              setType2(value);
            }}
          />
          <TextField
            label="PR 1"
            type="number"
            value={pr1}
            onChange={(value) => {
              setPr1(value);
            }}
          />
          <TextField
            label="PR 2"
            type="number"
            value={pr2}
            onChange={(value) => {
              setPr2(value);
            }}
          />
          <TextField
            label="PR 3"
            type="number"
            value={pr3}
            onChange={(value) => {
              setPr3(value);
            }}
          />
          <TextField
            label="PR 4"
            type="number"
            value={pr4}
            onChange={(value) => {
              setPr4(value);
            }}
          />
          <TextField
            label="PR 5"
            type="number"
            value={pr5}
            onChange={(value) => {
              setPr5(value);
            }}
          />
          <TextField
            label="PR 6"
            type="number"
            value={pr6}
            onChange={(value) => {
              setPr6(value);
            }}
          />
          <SelectField
            label="Battle min length"
            value={battleLengthMin}
            options={battleLengthOptions}
            onChange={(value) => {
              setBattleLengthMin(value);
            }}
          />
          <SelectField
            label="Battle max length"
            value={battleLengthMax}
            options={battleLengthOptions}
            onChange={(value) => {
              setBattleLengthMax(value);
            }}
          />
          <SelectField
            label="Set name"
            value={gameSetName}
            options={gameSetNames}
            onChange={(value) => {
              setGameSetName(value);
            }}
          />
          <SelectField
            label="Rarity"
            value={rarity}
            options={rarityOptions}
            onChange={(value) => {
              setRarity(value as Rarity);
            }}
          />
        </section>
        <section className="create-card__effects">
          <AddCardEffects effects={effects} setEffects={setEffects} />
        </section>
        <Button
          type="submit"
          className="create-card__submit"
          onClick={(event) => {
            event.preventDefault();
            onCreate();
          }}
        >
          Create
        </Button>
      </form>
    </>
  );
};

const getTypes = (cardType: CardTypeEnum) => {
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
