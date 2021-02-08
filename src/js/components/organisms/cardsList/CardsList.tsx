import React from "react";
import { CardType, CardTypeEnum } from "server/models";
import {
  SortableContainer,
  SortableElement,
  SortEnd,
} from "react-sortable-hoc";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

type Props = {
  cards: CardType[];
  onSortEnd: (sortEnd: SortEnd) => void;
};

const CardsList: React.FC<Props> = ({ cards, onSortEnd }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Card type</TableCell>
            <TableCell>Type 1</TableCell>
            <TableCell>Type 2</TableCell>
            <TableCell>PRs or Battle length</TableCell>
            <TableCell>Set</TableCell>
            <TableCell>Effects</TableCell>
          </TableRow>
        </TableHead>
        <SortableTableBody onSortEnd={onSortEnd}>
          {cards.map((card, index) => (
            <SortableTableRow key={card.name} index={index}>
              <TableCell>{card.collectorNumber}</TableCell>
              <TableCell>{card.name}</TableCell>
              <TableCell>{card.cardType}</TableCell>
              <TableCell>{card.type1}</TableCell>
              <TableCell>{card.type2}</TableCell>
              <TableCell>
                {card.cardType === CardTypeEnum.KUSKI && displayCardPrs(card)}
                {card.cardType === CardTypeEnum.LEVEL &&
                  displayCardBattleLengths(card)}
              </TableCell>
              <TableCell>{card.setName}</TableCell>
              <TableCell>{card.effects.length || "None"}</TableCell>
            </SortableTableRow>
          ))}
        </SortableTableBody>
      </Table>
    </TableContainer>
  );
};

const displayCardBattleLengths = (card: CardType) => {
  return `${card.battleLengthMin} ${
    card.battleLengthMax ? ` / ${card.battleLengthMax}` : ""
  }`;
};

const displayCardPrs = (card: CardType) => {
  return `${card.pr1 || ""} > ${card.pr2 || ""} > ${card.pr3 || ""} > ${
    card.pr4 || ""
  } > ${card.pr5 || ""} > ${card.pr6 || ""}`;
};

const SortableTableBody = SortableContainer(TableBody);
const SortableTableRow = SortableElement(TableRow);

export default CardsList;
