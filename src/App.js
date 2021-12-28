import React from "react";

import Sorter from "./components/Sorter";

import { Tabs, Tab } from "@mui/material";

import "./App.css";

export default function App() {
  const algorithms = [
    "Bubble ",
    "Insertion ",
    "Selection ",
    "Quick ",
    "Merge ",
    "Heap ",
  ];

  const sorterElem = React.useRef();

  const [value, setValue] = React.useState(algorithms[0]);
  const handleChange = (e, val) => {
    setValue(val);
    sorterElem.current.changeAlgorithm(val);
  };

  return (
    <div className="app">
      <div className="tabs">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          textColor="primary"
          indicatorColor="primary"
          centered={true}
        >
          {algorithms.map((alg, i) => (
            <Tab key={i} label={alg} value={alg} />
          ))}
        </Tabs>
      </div>
      <Sorter ref={sorterElem} />
    </div>
  );
}
