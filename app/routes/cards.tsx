import { TopBackLink } from "#app/components/top-back-link";
import { Paths } from "#app/config/paths";
import { prisma } from "#app/utils/db.server";
import { useNavigate } from "react-router";
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
    <main className="flex flex-col gap-6 p-4 pt-6">
      <TopBackLink />
      <h1 className="text-center text-4xl font-bold">Cards</h1>
      <div className="isolate flex flex-col gap-2 overflow-x-auto">
        <div className="text-end">{loaderData.cards.length} cards</div>
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
    </main>
  );
}
