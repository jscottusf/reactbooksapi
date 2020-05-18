import React from "react";

function Card(props) {
    return (
        <div className="card m-1">
            {props.children}
        </div>
    );
}

export default Card;