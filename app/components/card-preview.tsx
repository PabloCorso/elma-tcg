import { cn } from "#app/utils/misc";
import { CardType, type Card, type Effect } from "#app/utils/types";

const textBoxHeightPercentage = 39.2;
const prsHeightPercentage = 7.2;

const cardSize = {
  aspectRatio: 63.5 / 88.9,
  padding: "4.68%",
  nameHeight: "7.2%",
  imageHeight: "39.2%",
  typeLineHeight: "7.2%",
  textBoxHeight: `${textBoxHeightPercentage}%`,
  prsHeight: `${prsHeightPercentage}%`,
  onlyTextBoxHeight: `${textBoxHeightPercentage + prsHeightPercentage}%`,
  innerPaddingX: "3.08%",
};

export type CardProps = {
  card: Card;
  image: React.ReactNode;
  borderImageUrl: string;
  className?: string;
};

export function CardPreview({
  card,
  image,
  borderImageUrl,
  className,
}: CardProps) {
  const showBottomLine = card.cardType !== CardType.INSTANT;
  return (
    <div className={cn("w-[300px] cursor-default", className)}>
      <div
        style={{
          aspectRatio: cardSize.aspectRatio,
          padding: cardSize.padding,
          backgroundImage: `url(${borderImageUrl})`,
          backgroundRepeat: "round",
        }}
      >
        <div className="h-full divide-y divide-black w-full rounded-sm bg-white text-gray-900">
          <div
            className="flex items-center font-card-name text-[21px] font-bold"
            style={{
              height: cardSize.nameHeight,
              paddingLeft: cardSize.innerPaddingX,
              paddingRight: cardSize.innerPaddingX,
            }}
          >
            {card.name}
          </div>
          <div className="relative" style={{ height: cardSize.imageHeight }}>
            {image}
          </div>
          <div
            className="flex items-center font-card-type text-lg font-medium"
            style={{
              height: cardSize.typeLineHeight,
              paddingLeft: cardSize.innerPaddingX,
              paddingRight: cardSize.innerPaddingX,
            }}
          >
            <div className="text-sm">
              {card.cardType}
              {card.type1 || card.type2 ? " - " : null}
              {card.type1} {card.type2}
            </div>
            <div className="ml-auto">{card.rarity}</div>
          </div>
          <div
            className={cn(
              "flex h-full flex-col gap-2 overflow-auto py-2 text-sm leading-tight",
              {
                "text-[13px] gap-1.5 leading-tight tracking-tight":
                  card.effectsSize === "small",
              }
            )}
            style={{
              height: showBottomLine
                ? cardSize.textBoxHeight
                : cardSize.onlyTextBoxHeight,
              padding: 8,
              paddingLeft: cardSize.innerPaddingX,
              paddingRight: cardSize.innerPaddingX,
            }}
          >
            {card.effects?.map((effect) => {
              return (
                <EffectText
                  key={effect.text || effect.italicText}
                  effect={effect}
                />
              );
            })}
            {card.flavorText ? (
              <i className="mt-auto">{card.flavorText}</i>
            ) : null}
          </div>
          {showBottomLine && (
            <div
              className="flex items-center justify-center font-medium"
              style={{ height: cardSize.prsHeight }}
            >
              {card.cardType === CardType.KUSKI ? (
                <KuskiPrs card={card} />
              ) : null}
              {card.cardType === CardType.LEVEL ? (
                <>
                  {card.battleLengthMin} | {card.battleLengthMax}
                </>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EffectText({ effect }: { effect: Effect }) {
  return (
    <p>
      {effect.text}
      {effect.italicText ? (
        <i>
          {" ("}
          {effect.italicText}
          {")"}
        </i>
      ) : null}
    </p>
  );
}

type CardPrs = Pick<
  Card & { effects: Effect[] },
  "pr1" | "pr2" | "pr3" | "pr4" | "pr5" | "pr6"
>;

function KuskiPrs({ card }: { card: CardPrs }) {
  return <>{getPrsText(card)}</>;
}

function getPrsText(card: CardPrs) {
  let result = "";
  for (let i = 1; i <= 6; i++) {
    const pr = card[`pr${i}` as "pr1"];
    const hasPrsAfter = hasPrsAfterIndex(card, i);
    const isNf = !pr;
    result += `${isNf && hasPrsAfter ? "NF" : ""}${!isNf ? pr : ""}${
      hasPrsAfter ? " | " : ""
    }`;

    if (!hasPrsAfter) {
      break;
    }
  }

  return result;
}

function hasPrsAfterIndex(card: CardPrs, index: number) {
  let result = false;
  for (let i = index; i < 6; i++) {
    if (card[`pr${i + 1}` as "pr1"]) {
      result = true;
      break;
    }
  }

  return result;
}
