import { useState } from "react";
import { InputField, SelectField } from "./input";
import { CardType, Rarity } from "#app/utils/types";

type CardFormFieldsProps = { errors: any; card?: any };

export function CardFormFields({ errors, card }: CardFormFieldsProps) {
  const [cardType, setCardType] = useState(card?.cardType || CardType.KUSKI);

  return (
    <>
      <InputField
        label="Name"
        name="name"
        error={errors?.name}
        defaultValue={card?.name}
      />
      <SelectField
        label="Card type"
        name="cardType"
        error={errors?.cardType}
        value={cardType}
        onChange={(event) => setCardType(event.target.value as CardType)}
      >
        <option value={CardType.KUSKI}>{CardType.KUSKI}</option>
        <option value={CardType.LEVEL}>{CardType.LEVEL}</option>
        <option value={CardType.INSTANT}>{CardType.INSTANT}</option>
      </SelectField>
      <InputField
        label="Type 1"
        name="type1"
        error={errors?.type1}
        defaultValue={card?.type1 || ""}
      />
      <InputField
        label="Type 2"
        name="type2"
        error={errors?.type2}
        defaultValue={card?.type2 || ""}
      />
      <SelectField
        label="Rarity"
        name="rarity"
        error={errors?.rarity}
        defaultValue={card?.rarity}
      >
        <option value={Rarity.C}>{Rarity.C}</option>
        <option value={Rarity.U}>{Rarity.U}</option>
        <option value={Rarity.R}>{Rarity.R}</option>
      </SelectField>
      {cardType === CardType.KUSKI && (
        <PrFormFields errors={errors} card={card} />
      )}
      {cardType === CardType.LEVEL && (
        <>
          <InputField
            label="Minimum battle length"
            name="battleLengthMin"
            error={errors?.battleLengthMin}
            inputMode="numeric"
            defaultValue={card?.battleLengthMin || ""}
          />
          <InputField
            label="Maximum battle length"
            name="battleLengthMax"
            error={errors?.battleLengthMax}
            inputMode="numeric"
            defaultValue={card?.battleLengthMax || ""}
          />
        </>
      )}
      <InputField
        label="Flavor text"
        name="flavorText"
        error={errors?.flavorText}
        defaultValue={card?.flavorText || ""}
      />
    </>
  );
}

type PrFormFieldsProps = { errors: any; card?: any };

const defaultPrs = { pr1: "", pr2: "", pr3: "", pr4: "", pr5: "", pr6: "" };

function PrFormFields({ errors, card }: PrFormFieldsProps) {
  const [prs, setPrs] = useState(() => {
    const state = defaultPrs;
    if (card) {
      Object.keys(state).forEach((key) => {
        state[key as "pr1"] = card[key];
      });
    }

    return state;
  });

  function setPrValue(index: number, value: string) {
    if (value && value !== "NF" && Number(value) > 0) {
      const newValue = value !== "NF" ? value.trim() : "";
      setPrs((state) => ({
        ...state,
        [`pr${index}`]: newValue,
      }));
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    // TODO: won't trigger form onChange
    const prs = event.clipboardData.getData("text").split("|");
    prs.forEach((pr, index) => {
      setPrValue(index + 1, pr);
    });
  }

  return (
    <>
      {Object.keys(prs).map((key, index) => (
        <PrField
          key={key}
          index={index + 1}
          error={errors?.[key]}
          value={prs[key as "pr1"]}
          onChange={(event) => {
            setPrs((state) => ({
              ...state,
              [key]: event.target.value,
            }));
          }}
          onPaste={(event) => {
            event.preventDefault();
            if (index === 0) {
              handlePaste(event);
            }
          }}
        />
      ))}
    </>
  );
}

type PrFieldProps = Omit<
  React.ComponentProps<typeof InputField>,
  "name" | "label"
> & {
  index: number;
};

function PrField({ index, ...delegated }: PrFieldProps) {
  return (
    <InputField
      name={`pr${index}`}
      label={`Personal record ${index}`}
      inputMode="numeric"
      autoComplete="off"
      {...delegated}
    />
  );
}
