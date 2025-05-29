import { TopBackLink } from "#app/components/topBackLink";
import { Paths } from "#app/config/paths";
import { prisma } from "#app/utils/db.server";
import { Link, useNavigate } from "react-router";
import { data } from "react-router";
import type { Route } from "./+types/cards";

export async function loader() {
  const cards = await prisma.card.findMany({
    include: { effects: true },
  });
  return data({ cards });
}

export default function CardsPage({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const goToCard = (cardId: number) => {
    navigate(Paths.cardId(cardId));
  };

  return (
    <>
      <TopBackLink />
      <h1 className="mb-6 text-center text-4xl font-bold">Cards</h1>
      <Link
        to={Paths.newCard}
        className="btn-circle btn fixed right-6 bottom-6 z-10"
      >
        +
      </Link>
      <div className="isolate overflow-x-auto">
        <div className="mb-1 text-end">{loaderData.cards.length} cards</div>
        <table className="table-compact table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th className="text-center">Type</th>
              <th className="text-center">Rarity</th>
            </tr>
          </thead>
          <tbody>
            {loaderData.cards.map((card, index) => (
              <tr
                className="cursor-pointer"
                tabIndex={index + 1}
                key={card.id}
                onClick={() => {
                  goToCard(card.id);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    goToCard(card.id);
                  }
                }}
              >
                <td>{index + 1}</td>
                <td>{card.name}</td>
                <td className="text-center">{card.cardType.slice(0, 1)}</td>
                <td className="text-center">{card.rarity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
