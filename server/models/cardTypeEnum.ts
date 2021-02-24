enum CardTypeEnum {
  KUSKI = "Kuski",
  LEVEL = "Level",
  INSTANT = "Instant",
}

export type ValuesByCardType<T> = { [key in CardTypeEnum]?: T };
export const getValuesByCardType = function <T>(defaultValue: T) {
  return {
    [CardTypeEnum.KUSKI]: defaultValue,
    [CardTypeEnum.LEVEL]: defaultValue,
    [CardTypeEnum.INSTANT]: defaultValue,
  };
};

export default CardTypeEnum;
