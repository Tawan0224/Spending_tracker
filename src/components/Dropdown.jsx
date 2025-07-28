import React, { useState } from 'react';
import './Dropdown.css';

export default function Dropdown({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState('Select View');
  const options = ['Daily', 'Weekly', 'Monthly'];

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setOpen(false);
  };

  return (
    <div className="dropdown">
      <button onClick={() => setOpen(!open)} className="dropdown-toggle">
        {selected} ▼
      </button>
      <div className={`dropdown-menu ${open ? 'open' : ''}`}>
        {options.map((opt) => (
          <div
            key={opt}
            className="dropdown-item"
            onClick={() => handleSelect(opt)}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}