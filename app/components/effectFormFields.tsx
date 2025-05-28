import { useRef, useState } from "react";
import { getEffectFieldName } from "#app/utils/card-utils";
import { Input, InputField, Select, SelectField, TextareaField } from "./input";
import type { Effect } from "@prisma/client";
import { cn } from "#app/utils/misc";

type EffectFormFieldsProps = {
  index?: number;
  errors: any;
  effect?: any;
  options?: Effect[];
};

export function EffectFormField({
  index,
  errors,
  effect,
  options,
}: EffectFormFieldsProps) {
  const idAttr = getEffectFieldName(index, "id");
  const nameAttr = getEffectFieldName(index, "name");
  const textAttr = getEffectFieldName(index, "text");
  const italicTextAttr = getEffectFieldName(index, "italicText");

  const [name, setName] = useState(effect?.name || "");

  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);
  const italicTextRef = useRef<HTMLTextAreaElement>(null);

  const handleOptionsSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = event.target;
    const selectedOption = options?.find((option) => option.id + "" === value);
    if (selectedOption) {
      idRef.current!.value = selectedOption.id + "";
      setName(selectedOption.name || "");
      textRef.current!.value = selectedOption.text || "";
      italicTextRef.current!.value = selectedOption.italicText || "";
    }
  };

  return (
    <>
      <div className="flex items-end gap-4">
        {options?.length ? (
          <Select
            defaultValue=""
            className="w-0 p-[20px]"
            onChange={handleOptionsSelection}
          >
            <option disabled value="">
              -- select an option --
            </option>
            {options?.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </Select>
        ) : null}
        <Input
          ref={idRef}
          className="w-[44px] p-0 text-center"
          name={idAttr}
          defaultValue={effect?.id}
          placeholder="Id"
          readOnly
        />
        <span className="flex-1">
          <InputField
            ref={nameRef}
            label="Name"
            name={nameAttr}
            error={errors?.[nameAttr]}
            onChange={(event) =>
              setName(replaceSpaceWithDash(event.target.value))
            }
            value={name}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </span>
      </div>
      <TextareaField
        ref={textRef}
        label="Text"
        name={textAttr}
        error={errors?.[textAttr]}
        defaultValue={effect?.text || ""}
      />
      <TextareaField
        ref={italicTextRef}
        label="Italic text"
        name={italicTextAttr}
        error={errors?.[italicTextAttr]}
        defaultValue={effect?.italicText || ""}
      />
    </>
  );
}

function replaceSpaceWithDash(str: string) {
  return str.replace(/\s/g, "-");
}

type EffectsFormListProps = {
  effects?: any[];
  children: (index: number, effect: Partial<Effect>) => React.ReactNode;
};

export function EffectsFormList({ effects, children }: EffectsFormListProps) {
  const [formEffects, setFormEffects] = useState<Partial<Effect>[]>(
    effects || []
  );
  const handleAddEffect = () => {
    const newEffect = {};
    setFormEffects((state) => [...state, newEffect]);
  };
  const handleDeleteEffect = (index: number) => {
    // TODO: won't trigger form onChange
    setFormEffects((state) => [
      ...state.slice(0, index),
      ...state.slice(index + 1),
    ]);
  };

  return (
    <div>
      {formEffects.map((formEffect, index) => (
        <div
          key={index}
          className="flex flex-col gap-4"
          data-testid={`effect-${index + 1}`}
        >
          <div className={cn("divider mb-0", { "mt-10": index > 0 })}>
            Effect {index + 1}
            <button
              type="button"
              className="kbd btn-sm"
              onClick={() => handleDeleteEffect(index)}
            >
              🗑
            </button>
          </div>
          {children(index, formEffect)}
        </div>
      ))}

      <div className="divider">
        <button
          type="button"
          className="kbd btn-sm btn"
          onClick={handleAddEffect}
        >
          Add effect +
        </button>
      </div>
    </div>
  );
}
