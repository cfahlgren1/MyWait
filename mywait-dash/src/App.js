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
    </div>
  );
};

export default App;
