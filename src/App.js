import React from "react";
import ReactDOM from "react-dom";

import "./style.scss";

import LIST_DATA from "./data";

const App = () => {
    return (
        <>
            <div className="carousel">
                <div className="card-section">
                    {LIST_DATA.map((bike) => (
                        <div id={bike.id} className="card">
                            <img src={bike.img} alt={bike.img} />
                            <h1>{`${bike.name}`.toUpperCase()}</h1>
                        </div>)
                    )}
                </div>
                <div className="dots">
                    {LIST_DATA.length}
                </div>
            </div>
        </>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));