import React from 'react';

function DropdownFilter({ label, options, selected, onSelect }) {
    return (
        <div className="dropdown me-2">
            <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                {selected || label}
            </button>
            <ul className="dropdown-menu">
                <li>
                    <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            onSelect(null); 
                        }}
                    >
                        Show All
                    </a>
                </li>
                {options.map((option, index) => (
                    <li key={index}>
                        <a
                            className="dropdown-item"
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onSelect(option);
                            }}
                        >
                            {option}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DropdownFilter;