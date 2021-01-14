export type CardEffectType = {
  name: string;
  text: string;
  explanation?: string;
  keywordType?: boolean;
  keywordValue?: string;
};

export type CardEffectDBType = {
  name: string;
  text: string;
  explanation?: string;
  keyword_type?: boolean;
  keyword_value?: string;
};

const CardEffect = ({
  name,
  text,
  explanation,
  keyword_type,
  keyword_value,
}: CardEffectDBType) => {
  return {
    name,
    text,
    explanation,
    keywordType: keyword_type,
    keywordValue: keyword_value,
  };
};

export default CardEffect;
