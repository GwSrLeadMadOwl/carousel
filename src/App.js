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

    const devider = 250;

    let [start, setStart] = useState(0);
    let end = 0;
    let delta = 0;


    const handleWheel = (e) => {
        if (window.innerWidth > 1024) {
            const wheelTimeout = setTimeout(() => handleMovementEnd(), 100);
            clearTimeout(wheelTimeout);
            handleMovement(e.deltaY || e.deltaX);
        }
    };

    const handleTouchStart = (e) => {
        start = Math.round(e.nativeEvent.touches[0].clientX);
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
                delta = e.nativeEvent.touches[0].clientX / devider;
                handleMovement(-delta);
            }
        }
    };

    const handleTouchEnd = () => {
        handleMovementEnd();
        end = 0;
    };

    const handleMovementEnd = () => {
        const { bikes, movement } = list;

        const endPosition = movement / 100;
        const endPartial = endPosition % 1;
        console.log(endPartial, "%");

        const endingIndex = endPosition - endPartial;
        console.log(endingIndex, "endingIndex");

        let nextIndex = endingIndex;

        if (start < window.innerWidth / 2 && endPartial > 0.1) {
            // if (endPartial > 0.2) {
            nextIndex++;
            if (nextIndex > bikes.length)
                nextIndex = 0;
        }
        // if (start > window.innerWidth / 2 && endPartial > 0.2) {
        else if (endPartial > 0.1) {
            nextIndex -= 0;
            if (nextIndex < 0)
                nextIndex = bikes.length - 2;
        }

        transitionTo(nextIndex);
    };

    const transitionTo = (index) => {
        console.log(index);
        setList({
            bikes: LIST_DATA,
            currentIndex: index,
            movement: index * 100,
        });
    };

    const handleMovement = (delta) => {
        let nextMovement;
        setList((list) => {
            const maxLength = list.bikes.length - 1;
            nextMovement = list.movement + delta;

            //infinite scroll
            if (nextMovement < 0) {
                nextMovement = maxLength * 100;
            }
            if (nextMovement > maxLength * 100) {
                nextMovement = 0;
            }

            return {
                bikes: LIST_DATA,
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
