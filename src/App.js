import React, { useState } from "react";
import ReactDOM from "react-dom";

import Card from "./components/card.jsx";

import "./style.scss";

import LIST_DATA from "./data";

const App = () => {
    const [list, setList] = useState({
        bikes: LIST_DATA,
        currentIndex: 0,
        movement: 0
    });

    const handleWheel = (e) => {
        handleMovement(e.deltaX);
    };

    const handleMovement = (delta) => {
        setList((list) => {
            const maxLength = list.bikes.length - 1;
            let nextMovement = list.movement + delta;

            if (nextMovement < 0) {
                nextMovement = 0;
            }
            if (nextMovement > maxLength * 100) {
                nextMovement = maxLength * 100;
            }
            return {
                movement: nextMovement,
            };
        });
    };

    return (
        <>
            <div className="carousel" onWheel={handleWheel}>
                <div className="card-section">
                    <div className="scroll" style={{ transform: `translateX(${list.movement * -1}%)` }}>
                        <Card bikes={list.bikes} />
                    </div>
                </div>
                {/* <select name="bikes" id="bikes">
                    {list.bikes.map((bike) => (
                        <option value={bike.name}>{bike.name.toUpperCase()}</option>
                    ))}
                </select> */}
            </div>
        </>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
// };