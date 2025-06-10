import { cn } from "#app/utils/misc";
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
  className?: string;
};

export function CardPreview({
  card,
  image,
  borderImageUrl,
  className,
}: CardProps) {
  const showBottomLine = card.cardType !== CardType.INSTANT;

  // Text size calculation. TODO: find a more robust way to do this.
  const totalTextLength =
    card.effects.reduce(
      (acc, effect) =>
        acc + ((effect.text?.length ?? 0) + (effect.italicText?.length ?? 0)),
      0
    ) + (card.flavorText?.length ?? 0);
  const totalParagraphs = card.effects.length - 1 + (card.flavorText ? 1 : 0);
  const totalSimplifiedTextLength = card.effects
    .filter((effect) => effect.text)
    .reduce((acc, effect) => acc + (effect.text?.length ?? 0), 0);

  const totalTextWeight = totalParagraphs * 35 + totalTextLength;
  const simplifiedTextWeight = totalParagraphs * 20 + totalSimplifiedTextLength;

  const firstLevelTextWeight = 250;
  const secondLevelTextWeight = 280;
  const textVariant =
    totalTextWeight < firstLevelTextWeight ? "full" : "simplified";
  const textWeight =
    textVariant === "full" ? totalTextWeight : simplifiedTextWeight;

  let textSize: 14 | 13 | 12 = 14;
  if (textWeight > firstLevelTextWeight) {
    textSize = 13;
  }
  if (textWeight > secondLevelTextWeight) {
    textSize = 12;
  }

  return (
    <div
      className={cn("w-[300px] cursor-default", className)}
      data-testid="card-preview"
    >
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
            data-testid="card-preview-name"
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
            className={cn(
              "flex h-full flex-col gap-2 overflow-auto py-2 text-sm leading-tight",
              {
                "text-[13px] gap-1.5 leading-tight tracking-tight":
                  textSize === 13,
                "text-xs leading-tight gap-1.5 tracking-tight": textSize === 12,
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
                  key={effect.id}
                  effect={effect}
                  variant={textVariant}
                />
              );
            })}
            {card.flavorText ? (
              <i className="mt-auto" data-testid="card-preview-flavor-text">
                {card.flavorText}
              </i>
            ) : null}
          </div>
          {showBottomLine && (
            <div
              className="flex items-center justify-center font-medium"
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

function EffectText({
  effect,
  variant = "full",
}: {
  effect: Effect;
  variant?: "full" | "simplified";
}) {
  if (variant === "simplified" && !effect.text) {
    return null;
  }

  return (
    <p>
      <span
        title={variant === "simplified" ? effect.italicText || "" : undefined}
      >
        {effect.text}
      </span>
      {effect.italicText && variant === "full" ? (
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
