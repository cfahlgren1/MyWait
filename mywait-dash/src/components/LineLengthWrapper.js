import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Card from "./Card";

const ENDPOINT = "http://localhost:3030";

const LineLengthWrapper = () => {
  const [count, setCount] = useState(0);
  const [airport, setAirport] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log("Connecting to Socket");
    socket.on("airportData", (data) => {
      const checkin = JSON.parse(data.message);
      console.log(checkin);
      const airport = checkin.airport;
      const count = checkin.count;
      setCount(count);
      setAirport(airport);
      return;
    });
  }, []);

  return (
    <div>
      <Card count={count} name={airport} />
    </div>
  );
};

export default LineLengthWrapper;
