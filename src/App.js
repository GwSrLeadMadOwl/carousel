import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";

import "./style.scss";

import LIST_DATA from "./data";

const App = () => {
    const [offset, setOffset] = useState(0);
    let start;
    let end;

    useEffect(() => {
        window.addEventListener("dragstart", (e) => {
            start = e.clientX;
        });
        window.addEventListener("dragover", (e) => {
            e.preventDefault();
            let touch = e.clientX;
            end = start - touch;
        });
        window.addEventListener("dragend", () => {
            if (end > 0) {
                setOffset(offset - 300);
            } else {
                setOffset(offset + 300);
            }
        });
    }, []);

    // useEventListener('dragstart',)

    return (
        <>
            <div className="carousel">
                <div className="card-section">
                    <div className="scroll" style={{ transform: `translateX(${offset}px)` }}>
                        {LIST_DATA.map((bike) => (
                            <div id={bike.id} className="card">
                                <img src={bike.img} alt={bike.img} />
                                <h1>{`${bike.name}`.toUpperCase()}</h1>
                            </div>
                        ))}
                    </div>
                </div>
                <select name="bikes" id="bikes">
                    {LIST_DATA.map((bike) => (
                        <option value={bike.name}>{bike.name.toUpperCase()}</option>
                    ))}
                </select>
            </div>
        </>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));

const useEventListener = (eventName, handler, element = window) => {
    const saveHandler = useRef();

    useEffect(() => {
        saveHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const isSupported = element && element.addEventListener;
        if (!isSupported) return;

        const eventListener = e => saveHandler.current(e);

        element.addEventListener(eventName, eventListener);

        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, eventListener]);
};