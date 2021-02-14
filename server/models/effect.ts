export type EffectType = {
  id: number;
  name: string;
  text: string;
  italicText: string;
};

export type EffectDBType = {
  id: number;
  name: string;
  text?: string;
  italic_text?: string;
};

export const EffectFromDb = ({ italic_text, ...dbEffect }: EffectDBType) => {
  return Effect({
    ...dbEffect,
    italicText: italic_text,
  });
};

const Effect = ({
  id = 0,
  name = "",
  text = "",
  italicText = "",
}: Partial<EffectType>) => {
  return {
    id,
    name,
    text,
    italicText,
  };
};

export default Effect;
