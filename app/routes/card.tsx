import { data, UNSAFE_invariant } from "react-router";
import sky from "#app/assets/images/illustration.png";
import bike from "#app/assets/images/card-illustration-bike.png";
import ground from "#app/assets/images/inner-container-image.png";
import { useNavigate } from "react-router";
import { useCallback, useEffect, useRef, useState } from "react";

import { CardPreview } from "#app/components/card-preview";
import { PathName, Paths } from "#app/config/paths";
import type { Route } from "./+types/card";
import { TopBackLink } from "#app/components/top-back-link";
import { Link } from "react-router";
import { getCardById, getCards } from "#app/assets/data/data";

const MIN_SWIPE_DISTANCE = 64;
const SWIPE_DURATION = 150;

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

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isSwipe = Math.abs(distance) > MIN_SWIPE_DISTANCE;

    if (isSwipe) {
      setIsTransitioning(true);
      const isSwipeRight = distance > 0;

      setTimeout(function navigateWithDelay() {
        navigate(
          isSwipeRight ? Paths.cardId(nextCardId) : Paths.cardId(prevCardId)
        );
        setIsTransitioning(false);
      }, SWIPE_DURATION);
    }
  };

  const navigateWithArrowKeys = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft" && prevCardId) {
        navigate(Paths.cardId(prevCardId));
      } else if (event.key === "ArrowRight" && nextCardId) {
        navigate(Paths.cardId(nextCardId));
      }
    },
    [navigate, prevCardId, nextCardId]
  );

  useEffect(
    function addArrowKeysListener() {
      window.addEventListener("keydown", navigateWithArrowKeys);
      return () => {
        window.removeEventListener("keydown", navigateWithArrowKeys);
      };
    },
    [navigateWithArrowKeys]
  );

  return (
    <main ref={mainRef} className="flex flex-col gap-4 py-4 pt-10">
      <TopBackLink to={Paths.cards}>{PathName.cards}</TopBackLink>
      <h1 className="text-center text-2xl font-bold">
        <span className="text-gray-300">#{loaderData.cardId}</span>{" "}
        {loaderData.card?.name}
      </h1>
      <div className="grid grid-cols-[1fr_300px_1fr] justify-center items-center">
        <Link
          className="text-gray-800 text-2xl h-full hover:text-gray-300 flex items-center justify-center"
          to={Paths.cardId(prevCardId)}
          prefetch="viewport"
        >
          {"<"}
        </Link>
        <div
          className="flex justify-center touch-none"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          style={{ touchAction: "none" }}
        >
          {loaderData.card ? (
            <CardPreview
              className={`ring-1 ring-gray-800 rounded-lg transition-opacity duration-150 ${
                isTransitioning ? "opacity-90" : "opacity-100"
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
        <Link
          className="text-gray-800 text-2xl h-full hover:text-gray-300 flex items-center justify-center"
          to={Paths.cardId(nextCardId)}
          prefetch="viewport"
        >
          {">"}
        </Link>
      </div>
    </main>
  );
}
