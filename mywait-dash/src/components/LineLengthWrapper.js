import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Card from "./Card";
import LineChart from "./LineChart";

const ENDPOINT = "https://worker.mywait.live";

const LineLengthWrapper = () => {
  const [count, setCount] = useState(0);
  const [airport, setAirport] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    console.log("Connecting to Socket");
    socket.on("airportData", (data) => {
      const checkin = JSON.parse(data.message);
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
      <LineChart />
    </div>
  );
};

export default LineLengthWrapper;
