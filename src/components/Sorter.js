import React, { Component } from "react";

import Bar from "./Bar";
import Slider from "@mui/material/Slider";

import Bubble from "../algorithms/Bubble";
import Insertion from "../algorithms/Insertion";
import Selection from "../algorithms/Selection";
import Quick from "../algorithms/Quick";
import Merge from "../algorithms/Merge";
import Heap from "../algorithms/Heap";

// Icons:
import Play from "@mui/icons-material/PlayArrow";
import Pause from "@mui/icons-material/Pause";
import Replay from "@mui/icons-material/Replay";
import Forward from "@mui/icons-material/ChevronRight";
import Backward from "@mui/icons-material/ChevronLeft";

import "./Sorter.css";

class Sorter extends Component {
  state = {
    array: [],
    steps: [],
    colors: [],
    colorSteps: [],
    currentStep: 0,
    size: 20,
    delay: 300,
    playing: false,
    algorithm: Bubble,
    timeouts: [],
  };

  ALGORITHMS = {
    "Bubble ": Bubble,
    "Insertion ": Insertion,
    "Selection ": Selection,
    "Quick ": Quick,
    "Merge ": Merge,
    "Heap ": Heap,
  };

  componentDidMount = () => {
    this.generateArray();
    document.addEventListener("keydown", this.handleKeyDown);
  };

  handleKeyDown = (event) => {
    switch (event.keyCode) {
      case 32:
        if (this.state.playing) this.clearTimeouts();
        else this.play();
        break;
      case 39:
        this.clearTimeouts();
        this.forward();
        break;
      case 37:
        this.clearTimeouts();
        this.backward();
        break;
      case 82:
        this.generateArray();
        break;
      default:
        break;
    }
  };

  changeAlgorithm = (alg) => {
    this.setState({ algorithm: this.ALGORITHMS[alg] });
    this.generateArray();
  };

  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  generateArray = () => {
    this.clearTimeouts();
    this.clearColors();

    const arr = Array.from(new Array(this.state.size), (x, i) => i + 1);

    this.shuffleArray(arr);

    this.setState(
      {
        playing: false,
        array: arr,
        steps: [arr],
        currentStep: 0,
      },
      () => this.calculateSteps()
    );
  };

  clearColors = () => {
    const colors = new Array(this.state.size).fill(0);
    this.setState({
      colors: colors,
      colorSteps: [colors],
    });
  };

  clearTimeouts = () => {
    this.state.timeouts.forEach((timeout) => clearTimeout(timeout));
    this.setState({
      timeouts: [],
      playing: false,
    });
  };

  calculateSteps = () => {
    let array = this.state.array.slice();
    let steps = this.state.steps.slice();
    let colorSteps = this.state.colorSteps.slice();

    this.state.algorithm(array, steps, colorSteps);

    this.setState({
      steps: steps,
      colorSteps: colorSteps,
    });
  };

  play = () => {
    if (
      this.state.currentStep !== 0 &&
      this.state.currentStep + 1 >= this.state.steps.length
    )
      this.generateArray();
    else {
      this.clearTimeouts();
    }
    let steps = this.state.steps;

    let timeouts = [];
    for (let i = 0; i < steps.length; i++) {
      let timeout = setTimeout(() => {
        this.forward();
      }, this.state.delay * i);
      timeouts.push(timeout);
    }

    this.setState({
      timeouts: timeouts,
      playing: true,
    });
  };

  forward = () => {
    const nextStep = this.state.currentStep + 1;
    if (nextStep >= this.state.steps.length) {
      this.setState({ playing: false });
      return;
    }

    this.setState({
      array: this.state.steps[nextStep],
      colors: this.state.colorSteps[nextStep],
      currentStep: nextStep,
    });
  };

  backward = () => {
    const nextStep = this.state.currentStep - 1;
    if (nextStep < 0) return;
    this.setState({
      array: this.state.steps[nextStep],
      colors: this.state.colorSteps[nextStep],
      currentStep: nextStep,
    });
  };

  render() {
    const nChange = (event, newValue) => {
      this.setState(
        {
          size: newValue,
        },
        () => this.generateArray()
      );
    };
    const delayChange = (event, newValue) => {
      this.setState(
        {
          delay: 1500 - newValue,
        },
        () => this.clearTimeouts()
      );
    };

    const bars = this.state.array.map((val, i) => (
      <Bar
        key={i}
        value={val}
        color={this.state.colors[i]}
        numberOfBars={this.state.size}
      />
    ));

    const nMarks = [
      { value: 9, label: "10" },
      { value: 200, label: "200" },
    ];
    const delayMarks = [
      { value: 0, label: "Slowest" },
      { value: 1490, label: "Fastest" },
    ];

    let playPause;
    if (!this.state.playing) {
      playPause = (
        <button onClick={this.play}>
          <Play sx={{ fontSize: 40 }} />
        </button>
      );
    } else {
      playPause = (
        <button onClick={this.clearTimeouts}>
          <Pause sx={{ fontSize: 40 }} />
        </button>
      );
    }

    return (
      <div className="sorter" onKeyPress={this.play}>
        <div className="frame">
          <div className="bars">{bars}</div>
        </div>
        <div className="control-panel">
          <div className="slider">
            <h2>Number of bars:</h2>
            <Slider
              onChange={nChange}
              marks={nMarks}
              min={10}
              max={200}
              step={10}
              defaultValue={20}
              valueLabelDisplay="auto"
            />
          </div>
          <div className="control-buttons">
            <div className="button">
              <h3>{'"\u21E6"'}</h3>
              <button onClick={this.backward}>
                <Backward sx={{ fontSize: 40 }} />
              </button>
            </div>
            <div className="button">
              <h3>space</h3>
              {playPause}
            </div>
            <div className="button">
              <h3>"R"</h3>
              <button onClick={this.generateArray}>
                <Replay sx={{ fontSize: 40 }} />
              </button>
            </div>
            <div className="button">
              <h3>{'"\u21e8"'}</h3>
              <button onClick={this.forward}>
                <Forward sx={{ fontSize: 40 }} />
              </button>
            </div>
          </div>
          <div className="slider">
            <h2>Speed:</h2>
            <Slider
              onChange={delayChange}
              marks={delayMarks}
              min={0}
              max={1490}
              step={100}
              defaultValue={1000}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Sorter;
