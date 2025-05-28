import type { Card, Effect } from "@prisma/client";
import { z } from "zod";

export function getEffectFieldName(
  index: number | undefined,
  attribute: keyof Effect
) {
  return typeof index === "undefined"
    ? attribute
    : `effects[${index}].${attribute}`;
}

export function parseFormEffect(
  data: Record<string, any>,
  index?: number
): Effect {
  return {
    id: data?.[getEffectFieldName(index, "id")] || 0,
    name: data?.[getEffectFieldName(index, "name")] || "",
    text: data?.[getEffectFieldName(index, "text")] || "",
    italicText: data?.[getEffectFieldName(index, "italicText")] || null,
    createdAt: data?.[getEffectFieldName(index, "createdAt")] || new Date(),
    updatedAt: data?.[getEffectFieldName(index, "updatedAt")] || new Date(),
  };
}

export function parseFormEffects(data: Record<string, any>): Effect[] {
  const effectsCount = data
    ? Object.keys(data).filter(
        (item) => item.startsWith("effect") && item.endsWith("name")
      ).length
    : 0;

  const effects: Effect[] = [];
  for (let i = 0; i < effectsCount; i++) {
    effects.push(parseFormEffect(data, i));
  }

  return effects;
}

export function parseCardData(
  data: Partial<Card>
): Card & { effects: Effect[] } {
  const id = data?.id || 0;
  const name = data?.name || "";
  const cardType = data?.cardType || "KUSKI";
  const type1 = data?.type1 || null;
  const type2 = data?.type2 || null;
  const pr1 = data?.pr1 || null;
  const pr2 = data?.pr2 || null;
  const pr3 = data?.pr3 || null;
  const pr4 = data?.pr4 || null;
  const pr5 = data?.pr5 || null;
  const pr6 = data?.pr6 || null;
  const battleLengthMin = data?.battleLengthMin || null;
  const battleLengthMax = data?.battleLengthMax || null;
  const flavorText = data?.flavorText || null;
  const rarity = data?.rarity || "C";
  const deleted = false;

  const effects = parseFormEffects(data);

  return {
    id,
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
    flavorText,
    rarity,
    deleted,
    effects,
    createdAt: data?.createdAt || new Date(),
    updatedAt: data?.updatedAt || new Date(),
  };
}

const effectFormSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  text: z.string().nullable(),
  italicText: z.string().nullable(),
});

let cardFormSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  cardType: z.string(),
  // .oneOf([CardType.KUSKI, CardType.LEVEL, CardType.INSTANT])
  type1: z.string().nullable(),
  type2: z.string().nullable(),
  pr1: z.string().nullable(),
  pr2: z.string().nullable(),
  pr3: z.string().nullable(),
  pr4: z.string().nullable(),
  pr5: z.string().nullable(),
  pr6: z.string().nullable(),
  battleLengthMin: z.number().nullable(),
  battleLengthMax: z.number().nullable(),
  flavorText: z.string().nullable(),
  rarity: z.string(),
  // .oneOf([Rarity.C, Rarity.U, Rarity.R]).required(),
  deleted: z.boolean().default(false),
  // effects: z.array().of(effectFormSchema).default([]),
});

const getValidationErrors = (error: any) => {
  const validationErrors = {} as any;

  error.inner.forEach((error: any) => {
    if (error.path) {
      validationErrors[error.path] = error.message;
    }
  });

  return validationErrors;
};

// export async function validateCard(data: Partial<Card>) {
//   try {
//     const card = await cardFormSchema.validate(data, { abortEarly: false });
//     return card;
//   } catch (error) {
//     throw getValidationErrors(error);
//   }
// }

// export async function validateEffect(data: Partial<Effect>) {
//   try {
//     const effect = await effectFormSchema.validate(data, { abortEarly: false });
//     return effect;
//   } catch (error) {
//     throw getValidationErrors(error);
//   }
// }
