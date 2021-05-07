import React from "react";
import ReactDOM from "react-dom";

import "./style.scss";

const App = () => {
    return (
        <div className="card">
            <img src="../img/1330x748_V4-MY20_ACC_TO_3-4-ANT-DX_AMB_2.jpg" alt="superbike" />
            <h1>{`ducati panigale v4s`.toUpperCase()}</h1>
        </div>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));