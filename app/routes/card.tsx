import { data, UNSAFE_invariant } from "react-router";
import sky from "#app/assets/images/illustration.png";
import bike from "#app/assets/images/card-illustration-bike.png";
import ground from "#app/assets/images/inner-container-image.png";
import { useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";

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
  const navigate = useNavigate();
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const prevCardId =
    loaderData.cardId === 1 ? loaderData.lastCardId : loaderData.cardId - 1;
  const nextCardId =
    loaderData.cardId === loaderData.lastCardId ? 1 : loaderData.cardId + 1;

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > minSwipeDistance;

    if (isSwipe && !isTransitioning) {
      setIsTransitioning(true);
      if (distance > 0) {
        // Swipe right - go to next
        navigate(Paths.cardId(nextCardId));
      } else {
        // Swipe left - go to previous
        navigate(Paths.cardId(prevCardId));
      }
      // Reset transition state after animation
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  // Reset transition state when card changes
  useEffect(() => {
    setIsTransitioning(false);
  }, [loaderData.cardId]);

  return (
    <main
      ref={mainRef}
      className="flex flex-col gap-6 p-4 pt-6 touch-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <TopBackLink to={Paths.cards}>{PathName.cards}</TopBackLink>
      <h1 className="text-center text-4xl font-bold">
        <span className="text-gray-300">#{loaderData.cardId}</span>{" "}
        {loaderData.card?.name}
      </h1>
      <div className="flex justify-center">
        {loaderData.card ? (
          <CardPreview
            className={`shadow-lg shadow-gray-800 transition-transform duration-300 ${
              isTransitioning ? "scale-95 opacity-50" : "scale-100 opacity-100"
            }`}
            card={loaderData.card}
            borderImageUrl={ground}
            image={
              <>
                <img 
                  src={sky} 
                  alt="Illustration" 
                  className="h-full w-full" 
                  loading="eager"
                />
                <img
                  className="absolute top-1/2 left-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2"
                  src={bike}
                  alt="Bike"
                  loading="eager"
                />
              </>
            }
          />
        ) : null}
      </div>
      <div className="flex justify-between px-4">
        <Link to={Paths.cardId(prevCardId)} prefetch="viewport">
          &larr; Previous
        </Link>
        <Link to={Paths.cardId(nextCardId)} prefetch="viewport">
          Next &rarr;
        </Link>
      </div>
    </main>
  );
}
