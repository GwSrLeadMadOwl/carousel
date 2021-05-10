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

    let lastTouch = 0;

    const handleWheel = (e) => {
        if (window.innerWidth > 1024)
            handleMovement(e.deltaY || e.deltaX);
    };

    const handleTouchStart = (e) => {
        lastTouch = e.nativeEvent.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        const delta = lastTouch - e.nativeEvent.touches[0].clientX;
        lastTouch = e.nativeEvent.touches[0].clientX;
        if (window.innerWidth < 1024) {
            if (delta < 0)
                handleMovement(delta / 100000);
            if (delta > 0)
                handleMovement(delta * 1000000);
        }

    };

    const handleTouchEnd = () => {
        lastTouch = 0;
    };

    const handleMovement = (delta) => {
        setList((list) => {
            const maxLength = list.bikes.length - 1;
            let nextMovement = list.movement + delta;

            if (nextMovement < 0) {
                nextMovement = maxLength * 100;
            }
            if (nextMovement > maxLength * 100) {
                nextMovement = 0;
            }
            return {
                bikes: LIST_DATA,
                currentIndex: 0,
                movement: nextMovement,
            };
        });
    };

    return (
        <>
            <div className="carousel"
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}>
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