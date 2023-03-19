import React from "react";

const loader = () => {
  return (
    <div className="spinner-container">
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default loader;
