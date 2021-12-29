import React from "react";

import Sorter from "./components/Sorter";

import { Tabs, Tab } from "@mui/material";
import Measure from "react-measure";

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

  const [width, setWidth] = React.useState(null);

  return (
    <div className="app">
      <div className="tabs">
        <Measure
          bounds
          onResize={(contentRect) => {
            setWidth(contentRect.bounds.width);
          }}
        >
          {({ measureRef }) => (
            <div ref={measureRef}>
              <Tabs
                variant={width < 600 ? "scrollable" : "fullWidth"}
                centered={width > 600}
                scrollButtons="auto"
                allowScrollButtonsMobile
                value={value}
                onChange={handleChange}
                textColor="primary"
                indicatorColor="primary"
              >
                {algorithms.map((alg, i) => (
                  <Tab key={i} label={alg} value={alg} />
                ))}
              </Tabs>
            </div>
          )}
        </Measure>
      </div>
      <Sorter ref={sorterElem} />

      <a href="https://github.com/tobiaspaulsen/sorting">Github repository</a>
    </div>
  );
}
