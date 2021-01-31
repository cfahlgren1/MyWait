import React, { useState, useEffect } from "react";
import moment from "moment";

import "chartjs-plugin-streaming";
import { Line } from "react-chartjs-2";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:8080";

const LineChart = () => {
  const [response, setResponse] = useState({
    "bost-logan": 40,
    "jacksonville-international": 30,
  });

  const data = {
    datasets: [
      {
        label: "Boston Logan International Airport",
        slug: "boston-logan",
        data: [],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Second dataset",
        slug: "jacksonville-international",
        data: [],
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  const updateData = (event) => {
    data.datasets.forEach((data) => {
      if (data.slug === event.slug) {
        // update count for people in line based on check in/out
        let count = data.count;
        if (count > 0 && event.checked === "out") {
          count -= 1;
        } else if (event.checked === "in") {
          count += 1;
        }
        const airportData = response;

        // update specific airport
        airportData[`${event.slug}`] = count;
        setResponse(airportData);
      }
    });
  };

  setTimeout(function () {
    updateData({ slug: "boston-logan", checked: "out" });
  }, 3000);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("checkEvent", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <div>
      <Line
        data={data}
        options={{
          scales: {
            xAxes: [
              {
                type: "realtime",
                realtime: {
                  duration: 20000,
                  refresh: 1000,
                  delay: 2000,
                  ttl: undefined,
                  onRefresh: (chart) => {
                    data.datasets.forEach((airport) => {
                      airport.data.push({
                        x: moment(),
                        y: response[`${airport.slug}`],
                      });
                    });
                    chart.update({
                      preservation: true,
                    });
                  },
                },
              },
            ],
          },
          maintainAspectRatio: false,
        }}
        height={400}
        width={600}
      />
    </div>
  );
};
export default LineChart;
