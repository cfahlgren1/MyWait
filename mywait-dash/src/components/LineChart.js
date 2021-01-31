import React, { useState, useEffect } from "react";
import moment from "moment";
import "chartjs-plugin-streaming";
import { Line } from "react-chartjs-2";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:3030";

class LineChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartReference = React.createRef();

    this.data = {
      labels: [],
      datasets: [
        {
          label: "",
          data: [],
          borderWidth: 8,
          slug: "boston-logan",
          fill: false,
          borderColor: "rgba(75,192,192,1)",
        },
      ],
    };
  }

  componentDidMount() {
    const socket = socketIOClient(ENDPOINT);
    socket.on("airportData", (record) => {
      const checkin = JSON.parse(record.message);
      const count = checkin.count;

      // update chart data
      this.data.datasets[0].label = `${checkin.airport} - Wait Time`;
      this.data.datasets[0].slug = checkin.slug;
      this.data.labels.push(moment(checkin.date).format("LTS"));
      this.data.datasets[0].data.push(count);

      // if there are more than 10 x values, remove the oldest
      if (this.data.labels.length > 10) {
        this.data.datasets[0].data.shift();
        this.data.labels.shift();
      }
      this.chartReference.current.chartInstance.update();
    });
    console.log();
  }

  render() {
    return (
      <div>
        <Line
          data={this.data}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    min: 0,
                    fontSize: 20,
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
          height={400}
          width={600}
          ref={this.chartReference}
        />
      </div>
    );
  }
}

export default LineChart;
