import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import "./check-simulator.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const CheckSimulator = () => {
  const classes = useStyles();

  // handle check in / out from button
  const handleCheck = async (direction) => {
    // user checks in
    if (direction === "in") {
      await axios.post(`http://localhost:8080/api/messages`, {
        airport: "Boston International Airport",
        check: "in",
      });
    }
    // user checks out
    else if (direction === "out") {
      await axios.post(`http://localhost:8080/api/messages`, {
        airport: "Boston International Airport",
        check: "out",
      });
    }
  };

  return (
    <div className={classes.root}>
      <ButtonGroup
        color="secondary"
        variant="contained"
        aria-label="contained secondary button group"
      >
        <Button onClick={() => handleCheck("in")}>Check In</Button>
        <Button onClick={() => handleCheck("out")}>Check Out</Button>
      </ButtonGroup>
    </div>
  );
};

export default CheckSimulator;
