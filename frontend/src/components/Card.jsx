import React from "react";

const Card = () => {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
