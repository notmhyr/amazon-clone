import React from "react";
import { MutatingDots } from "react-loader-spinner";

function LoadingIcon() {
  return (
    <div className="loading">
      <MutatingDots
        height="100"
        width="100"
        color="#f0c14b"
        secondaryColor="#f0c14b"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        visible={true}
      />
    </div>
  );
}

export default LoadingIcon;
