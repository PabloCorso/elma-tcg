import { TopBackLink } from "#app/components/top-back-link";
import { Paths } from "#app/config/paths";
import { useNavigate } from "react-router";
import { data } from "react-router";
import type { Route } from "./+types/cards";
import { getCards } from "#app/assets/data/data";

export async function loader() {
  const cards = getCards();
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
            {loaderData.cards.map((card) => (
              <tr
                className="cursor-pointer"
                tabIndex={card.id}
                key={card.name}
                onClick={() => {
                  goToCard(card.id);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    goToCard(card.id);
                  }
                }}
              >
                <td>{card.id}</td>
                <td>{card.name}</td>
                <td className="text-center">{card.cardType?.slice(0, 1)}</td>
                <td className="text-center">{card.rarity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
