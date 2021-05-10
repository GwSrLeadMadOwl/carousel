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

    const [start, setStart] = useState(0);
    let end = 0;

    const handleWheel = (e) => {
        if (window.innerWidth > 1024)
            handleMovement(e.deltaY || e.deltaX);
    };

    const handleTouchStart = (e) => {
        start = Math.round(e.nativeEvent.touches[0].clientX);
        console.log("TOUCH");
        // return start;
    };

    const handleTouchMove = (e) => {
        let delta = 0;
        setStart(Math.round(e.nativeEvent.touches[0].clientX));
        end = Math.round(e.nativeEvent.touches[0].clientX);


        if (window.innerWidth < 1024) {
            // swipe right
            // if (start > window.innerWidth / 2) {
            if (start > end) {
                console.log("Start greater: ", start);
                console.log("End: ", end);
                delta = window.innerWidth - e.nativeEvent.touches[0].clientX;
                console.log(delta);
                handleMovement(delta / 100);
            }
            //swipe left
            // else if (start < window.innerWidth / 2) {
            else if (start < end) {
                console.log("Start: ", start);
                console.log("End greater: ", end);
                delta = end + e.nativeEvent.touches[0].clientX;
                console.log(delta);
                handleMovement(-(delta / 100));
            }
        }
    };

    const handleTouchEnd = () => {
        end = 0;
        console.log("RELEASE");
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
