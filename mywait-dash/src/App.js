import React from "react";
import "./App.css";

import LineLengthWrapper from "./components/LineLengthWrapper";
import CheckSimulator from "./components/CheckSimulator";

const App = () => {
  return (
    <div>
      <h1>MyWait Live TSA Line</h1>
      <LineLengthWrapper />
      <CheckSimulator />
      <p
        style={{
          textAlign: "center",
          color: "white",
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          fontStyle: "italic",
        }}
      >
        We auto checkout 1 user every 4 seconds to simulate users getting
        through TSA.
      </p>
    </div>
  );
};

export default App;
