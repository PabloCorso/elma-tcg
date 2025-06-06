import { CardType } from "#app/utils/types";
import type { Card, Effect } from "@prisma/client";

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
  card: Card & { effects: Effect[] };
  image: React.ReactNode;
  borderImageUrl: string;
};

export function CardPreview({ card, image, borderImageUrl }: CardProps) {
  const showBottomLine = card.cardType !== CardType.INSTANT;
  return (
    <div className="w-[300px]" data-testid="card-preview">
      <div
        style={{
          aspectRatio: cardSize.aspectRatio,
          padding: cardSize.padding,
          backgroundImage: `url(${borderImageUrl})`,
          backgroundRepeat: "round",
        }}
      >
        <div className="h-full w-full rounded-sm bg-white text-gray-900">
          <div
            className="flex items-center font-card-name text-xl font-bold"
            style={{
              height: cardSize.nameHeight,
              paddingLeft: cardSize.innerPaddingX,
              paddingRight: cardSize.innerPaddingX,
              fontSize: 21,
            }}
            data-testid="card-preview-name"
          >
            {card.name}
          </div>
          <div className="relative" style={{ height: cardSize.imageHeight }}>
            {image}
          </div>
          <div
            className="flex items-center font-card-type font-medium"
            style={{
              height: cardSize.typeLineHeight,
              paddingLeft: cardSize.innerPaddingX,
              paddingRight: cardSize.innerPaddingX,
              fontSize: 18,
            }}
          >
            <div className="text-sm" data-testid="card-preview-type-line">
              {card.cardType}
              {card.type1 || card.type2 ? " - " : null}
              {card.type1} {card.type2}
            </div>
            <div className="ml-auto" data-testid="card-preview-rarity">
              {card.rarity}
            </div>
          </div>
          <div
            className="flex h-full flex-col gap-2 overflow-auto border-t-[1px] border-black py-2 text-sm"
            style={{
              height: showBottomLine
                ? cardSize.textBoxHeight
                : cardSize.onlyTextBoxHeight,
              padding: 8,
              paddingLeft: cardSize.innerPaddingX,
              paddingRight: cardSize.innerPaddingX,
            }}
          >
            {card.effects?.map((effect, index) => (
              <p
                key={`effect-${effect?.id}-${index}`}
                data-testid={`card-preview-effect-${index}`}
              >
                <EffectText effect={effect} />
              </p>
            ))}
            {card.flavorText ? (
              <i className="mt-auto" data-testid="card-preview-flavor-text">
                {card.flavorText}
              </i>
            ) : null}
          </div>
          {showBottomLine && (
            <div
              className="flex items-center justify-center border-t-[1px] border-black font-medium"
              style={{ height: cardSize.prsHeight }}
              data-testid="card-preview-bottom-line"
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
    <>
      {effect.text}{" "}
      {effect.italicText ? (
        <i>
          {"("}
          {effect.italicText}
          {")"}
        </i>
      ) : null}
    </>
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
