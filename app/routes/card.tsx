import { data, UNSAFE_invariant } from "react-router";
import sky from "#app/assets/images/illustration.png";
import bike from "#app/assets/images/card-illustration-bike.png";
import ground from "#app/assets/images/inner-container-image.png";

import { CardPreview } from "#app/components/card-preview";
import { PathName, Paths } from "#app/config/paths";
import type { Route } from "./+types/card";
import { TopBackLink } from "#app/components/top-back-link";
import { Link } from "react-router";
import { getCardById, getCards } from "#app/assets/data/data";

export async function loader({ params }: Route.LoaderArgs) {
  const cardId = Number(params.cardId);
  const card = getCardById(cardId);
  const cards = getCards();

  UNSAFE_invariant(card, "Card not found");

  return data({ card, cardId, lastCardId: cards.length });
}

export default function CardPage({ loaderData }: Route.ComponentProps) {
  const prevCardId =
    loaderData.cardId === 1 ? loaderData.lastCardId : loaderData.cardId - 1;
  const nextCardId =
    loaderData.cardId === loaderData.lastCardId ? 1 : loaderData.cardId + 1;

  return (
    <main className="flex flex-col gap-6 p-4 pt-6">
      <TopBackLink to={Paths.cards}>{PathName.cards}</TopBackLink>
      <h1 className="text-center text-4xl font-bold">
        <span className="text-gray-300">#{loaderData.cardId}</span>{" "}
        {loaderData.card?.name}
      </h1>
      <div className="flex justify-center">
        {loaderData.card ? (
          <CardPreview
            className="shadow-lg shadow-gray-800"
            card={loaderData.card}
            borderImageUrl={ground}
            image={
              <>
                <img src={sky} alt="Illustration" className="h-full w-full" />
                <img
                  className="absolute top-1/2 left-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2"
                  src={bike}
                  alt="Bike"
                />
              </>
            }
          />
        ) : null}
      </div>
      <div className="flex justify-between px-4">
        <Link to={Paths.cardId(prevCardId)}>&larr; Previous</Link>
        <Link to={Paths.cardId(nextCardId)}>Next &rarr;</Link>
      </div>
    </main>
  );
}
