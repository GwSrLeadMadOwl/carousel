import React, { memo } from "react";

const Card = memo(({ bikes }) => {
    return (
        <>
            {bikes.map((bike) => (
                <div id={bike.id} className="card">
                    <img src={bike.img} alt={bike.img} />
                    <h1>{`${bike.name}`.toUpperCase()}</h1>
                </div>
            ))}
        </>);
});

export default Card;