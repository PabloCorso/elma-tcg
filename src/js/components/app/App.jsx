import React, { useState } from "react";
import { Button } from "@material-ui/core";
import CreateCard from "../createCard";

const App = () => {
  const [showCreateCard, setShowCreateCard] = useState(false);
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setShowCreateCard(true);
        }}
      >
        Add new card +
      </Button>
      {showCreateCard && <CreateCard />}
    </div>
  );
};

export default App;
