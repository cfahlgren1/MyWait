import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import "./card.css";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  "MuiCardContent-root": {
    textAlign: "center",
  },
  "makeStyles-root-5": {
    maxWidth: "40rem",
    margin: "auto",
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography
          style={{ fontSize: "4rem", fontWeight: "600" }}
          variant="h5"
          component="h2"
        >
          {props.count}
        </Typography>
        <Typography
          style={{ color: "gray", fontSize: "1rem" }}
          variant="h5"
          component="h5"
        >
          <i>People in line..</i>
        </Typography>
        <Typography>
          <i>
            "Estimated wait time:{" "}
            <b>{Math.floor(props.count * 0.75)} minutes</b> "
          </i>
        </Typography>
      </CardContent>
    </Card>
  );
}
