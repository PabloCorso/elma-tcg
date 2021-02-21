import React from "react";
import { Skeleton } from "@material-ui/lab";
import "./cardEditionSkeleton.css";

const CardEditionSkeleton = () => {
  return (
    <section>
      <Skeleton classes={{ root: "card-edition-sekeleton__header" }} />
      <div className="card-edition-skeleton__form">
        <Skeleton classes={{ root: "card-edition-skeleton__item" }} />
        <Skeleton classes={{ root: "card-edition-skeleton__item" }} />
        <Skeleton classes={{ root: "card-edition-skeleton__item" }} />
        <Skeleton classes={{ root: "card-edition-skeleton__item" }} />
        <Skeleton classes={{ root: "card-edition-skeleton__item" }} />
      </div>
      <div className="card-edition-skeleton__form-flavor">
        <Skeleton classes={{ root: "card-edition-skeleton__item" }} />
      </div>

      <Skeleton classes={{ root: "card-edition-sekeleton__submit" }} />
    </section>
  );
};

export default CardEditionSkeleton;
