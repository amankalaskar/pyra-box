// src/Pyramid.tsx

import React, { useState, ChangeEvent } from 'react';
import './Pyramid.css';

interface PyramidProps {}

const Pyramid: React.FC<PyramidProps> = () => {
  const [boxSize, setBoxSize] = useState<number>(100);
  const [gapSize, setGapSize] = useState<number>(10);
  const [rows, setRows] = useState<number[]>([1, 2, 3, 4, 5]);

  const addRow = () => {
    setRows([...rows, rows.length + 1]);
  };

  const addBox = (index: number) => {
    const newRows = [...rows];
    newRows[index] += 1;
    setRows(newRows);
  };

  const removeBox = (rowIndex: number) => {
    const newRows = [...rows];
    if (newRows[rowIndex] > 0) {
      newRows[rowIndex] -= 1;
    }
    setRows(newRows);
  };

  const handleBoxSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setBoxSize(parseInt(event.target.value));
  };

  const handleGapSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setGapSize(parseInt(event.target.value));
  };

  const rowMinHeight = boxSize + 2 * gapSize;

  const pyramid = rows.map((boxCount, rowIndex) => (
    <div key={rowIndex} className="row" style={{ minHeight: `${rowMinHeight}px` }}>
      <button className="add-box-button" onClick={() => addBox(rowIndex)}>+</button>
      <div className="boxes">
        {Array.from({ length: boxCount }).map((_, boxIndex) => (
          <div
            key={boxIndex}
            className="box"
            style={{ width: `${boxSize}px`, height: `${boxSize}px`, margin: `5px ${gapSize}px` }}
            onClick={() => removeBox(rowIndex)}
          ></div>
        ))}
      </div>
    </div>
  ));

  return (
    <div className="pyramid-container">
      <div className="controls">
        <label htmlFor="boxSizeSlider">Box Size:</label>
        <input
          type="range"
          id="boxSizeSlider"
          min="50"
          max="200"
          value={boxSize}
          onChange={handleBoxSizeChange}
        />
        <span>{boxSize}px</span>
        <label htmlFor="gapSizeSlider">Gap Size:</label>
        <input
          type="range"
          id="gapSizeSlider"
          min="0"
          max="50"
          value={gapSize}
          onChange={handleGapSizeChange}
        />
        <span>{gapSize}px</span>
      </div>
      <div className="pyramid">{pyramid}</div>
      <button onClick={addRow} className="add-row-button">+</button>
    </div>
  );
};

export default Pyramid;
