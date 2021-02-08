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

const Effect = ({ id, name, text = "", italic_text = "" }: EffectDBType) => {
  return {
    id,
    name,
    text,
    italicText: italic_text,
  };
};

export default Effect;
