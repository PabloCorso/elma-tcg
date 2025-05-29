import { data } from "react-router";
import sky from "#app/assets/images/illustration.png";
import bike from "#app/assets/images/card-illustration-bike.png";
import ground from "#app/assets/images/inner-container-image.png";

import { CardPreview } from "#app/components/cardPreview";
import { PathName, Paths } from "#app/config/paths";
import { prisma } from "#app/utils/db.server";
import type { Route } from "./+types/card";
import { TopBackLink } from "#app/components/topBackLink";

export async function loader({ params }: Route.LoaderArgs) {
  const cardId = Number(params.cardId);
  const card = await prisma.card.findUnique({
    where: { id: cardId },
    include: { effects: true },
  });
  return data({ card });
}

export default function CardPage({ loaderData }: Route.ComponentProps) {
  return (
    <main className="flex flex-col gap-6 p-4 pt-6">
      <TopBackLink to={Paths.cards}>{PathName.cards}</TopBackLink>
      <h1 className="text-center text-4xl font-bold">
        {loaderData.card?.name}
      </h1>
      <div className="flex justify-center">
        {loaderData.card ? (
          <CardPreview
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
    </main>
  );
}
