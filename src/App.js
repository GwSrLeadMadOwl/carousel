import React, { useState } from "react";
import ReactDOM from "react-dom";

import Card from "./components/card.jsx";

import "./style.scss";

import LIST_DATA from "./data";

const App = () => {
    const [list, setList] = useState({
        bikes: LIST_DATA,
        currentImg: 0,
        movement: 0
    });

    const devider = 250;

    let [start, setStart] = useState(0);
    let end = 0;
    let delta = 0;
    let touchUp = false;

    const handleWheel = (e) => {
        if (window.innerWidth > 1024)
            handleMovement(e.deltaY || e.deltaX);
    };

    const handleTouchStart = (e) => {
        start = Math.round(e.nativeEvent.touches[0].clientX);
        touchUp = false;
    };

    const handleTouchMove = (e) => {
        setStart(Math.round(e.nativeEvent.touches[0].clientX));
        end = Math.round(e.nativeEvent.touches[0].clientX);

        if (window.innerWidth < 1024) {
            // swipe right
            if (start > end) {
                delta = (window.innerWidth - e.nativeEvent.touches[0].clientX) / devider;
                handleMovement(delta);
            }
            //swipe left
            else if (start < end) {
                delta = (end + e.nativeEvent.touches[0].clientX) / devider;
                handleMovement(-delta);
            }
        }
    };

    const handleTouchEnd = () => {
        touchUp = true;
        end = 0;
    };

    const handleMovement = (delta) => {
        setList((list) => {
            const maxLength = list.bikes.length - 1;
            let nextMovement = list.movement + delta;
            let currentBike;

            //infinite scroll
            if (nextMovement < 0) {
                nextMovement = maxLength * 100;
            }
            if (nextMovement > maxLength * 100) {
                nextMovement = 0;
            }

            //animated swipe of images
            if (delta > 0 && touchUp) {
                currentBike = list.currentImg + 1;
            }
            if (delta < 0 && touchUp) {
                currentBike = list.currentImg - 1;
            }

            return {
                bikes: LIST_DATA,
                currentImg: currentBike,
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
