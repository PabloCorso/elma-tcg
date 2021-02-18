import React, { useState } from "react";
import { CardType, CardTypeEnum } from "server/models";
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/MoreVert";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./cardsList.css";

type Props = {
  cards: CardType[];
  onEdit: (cardId: number) => void;
  onDelete: (cardId: number) => void;
  maxWidth?: number;
};

const CardsList: React.FC<Props> = ({
  cards,
  onEdit,
  onDelete,
  maxWidth = 600,
}) => {
  const [cardId, setCardId] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <TableContainer component={Paper} style={{ maxWidth }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>PRs or Battle length</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => (
              <TableRow key={card.name}>
                <TableCell component="th" scope="row">
                  {card.name}
                </TableCell>
                <TableCell>
                  {card.cardType} - {card.rarity}
                </TableCell>
                <TableCell>
                  {card.cardType === CardTypeEnum.KUSKI && displayCardPrs(card)}
                  {card.cardType === CardTypeEnum.LEVEL &&
                    displayCardBattleLengths(card)}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    onClick={(event) => {
                      setCardId(card.id);
                      setMenuAnchorEl(event.currentTarget);
                    }}
                  >
                    <MenuIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setMenuAnchorEl(null);
            onEdit(cardId);
          }}
        >
          <EditIcon /> Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setMenuAnchorEl(null);
            onDelete(cardId);
          }}
        >
          <DeleteIcon /> Delete
        </MenuItem>
      </Menu>
    </>
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

export default CardsList;
