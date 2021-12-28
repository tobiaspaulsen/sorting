import "./Bar.css";

// This probably needs to be a class?
function Bar({ value, color, numberOfBars }) {
  const b = (1 - value / (numberOfBars * 2)) * 255;
  const g = (0.5 + value / (numberOfBars * 2)) * 255;

  const colors = [
    `rgba(0, ${g}, ${b}, 1)`, // 0: Standard color
    "rgba(255, 48, 79, 1)", // 1: Red for swaps
    "rgb(255, 174, 0)", // 2: Orange for traversing
    "rgb(255, 252, 57)", // 3: Yellow for indicating
    `rgba(0, ${g}, ${b}, 0.2)`, // 4: Inactive
    "rgb(161, 62, 138)", // 5: Purple
    `rgba(${b * 0.8}, 50, ${g / 1.2}, 1)`, // 6: Alternative
  ];

  const style = {
    height: `${(value / numberOfBars) * 100}%`,
    backgroundColor: colors[color],
  };

  return (
    <>
      <div className="bar-wrapper">
        <div className="bar" style={style}></div>
      </div>
    </>
  );
}

export default Bar;
