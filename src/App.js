import React, { useState } from "react";
import ReactDOM from "react-dom";

import Card from "./components/card.jsx";

import "./style.scss";

import LIST_DATA from "./data";

const App = () => {
    const [list, setList] = useState({
        bikes: LIST_DATA,
        movement: 0,
    });

    const devider = 250;
    const limiter = 10;

    let [start, setStart] = useState(0);
    let end = 0;
    let delta = 0;

    let [duration, setDuration] = useState(0.5);

    const handleWheel = (e) => {
        let scrollEnds;
        if (window.innerWidth > 1024) {
            handleMovement(e.deltaY / limiter || e.deltaX / limiter);

            //BUG WITH SWIPES
            setDuration(1);
            clearTimeout(scrollEnds);
            scrollEnds = setTimeout((e) => {
                // if (e.deltaX === 0 && e.deltaY === 0)
                handleTouchEnd(); console.log("MUST FIT!");
            }, 500);
        }
        console.log(e.deltaX, e.deltaY);
    };

    const handleTouchStart = (e) => {
        start = Math.round(e.nativeEvent.touches[0].clientX);
        setDuration(0.5);
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

    const handleMovement = (delta) => {
        let nextMovement;
        setList((list) => {
            const maxLength = list.bikes.length - 1;
            nextMovement = list.movement + delta;

            //infinite scroll
            if (nextMovement < 0) {
                nextMovement = maxLength * 100;
                // duration = 0;
                setDuration(0);
            }
            if (nextMovement > maxLength * 100) {
                nextMovement = 0;
                // duration = 0;
                setDuration(0);
            }

            return {
                bikes: LIST_DATA,
                movement: nextMovement,
            };
        });
    };

    const handleTouchEnd = () => {
        const { bikes, movement } = list;
        fitPhoto(bikes, movement);
        end = 0;
    };

    const fitPhoto = (bikes, movement) => {
        const endPosition = movement / 100;
        const endPartial = endPosition % 1;
        const endingIndex = endPosition - endPartial;
        let nextIndex = endingIndex;

        if (start < window.innerWidth / 2 && endPartial > 0.1) {
            nextIndex++;
            if (nextIndex > bikes.length) {
                nextIndex = -1;
            }
        }
        else if (endPartial > 0.1) {
            nextIndex -= 0;
            if (nextIndex < 0) {
                nextIndex = bikes.length - 2;
            }
        }
        transitionTo(nextIndex);
    };

    const transitionTo = (index) => {
        setList({
            bikes: LIST_DATA,
            currentIndex: index,
            movement: index * 100
        });
    };

    //select specific bike
    const handleChange = (e) => {
        transitionTo(e.target.value - 1);
    };

    return (
        <>
            <div className="carousel"
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}>
                <div className="card-section">
                    <div className="scroll" style={{ transform: `translateX(${list.movement * -1}%)`, transitionDuration: `${duration}s` }}>
                        <Card bikes={list.bikes} />
                    </div>
                </div>
                <select name="bikes" id="bikes" onChange={handleChange}>
                    {list.bikes.map((bike) => (
                        <option value={bike.id} key={bike.id}>{bike.name.toUpperCase()}</option>
                    ))}
                </select>
            </div>
        </>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));
