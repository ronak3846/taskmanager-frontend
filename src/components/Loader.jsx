import React from "react";
import { Circles } from "react-loader-spinner";

function Loader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-40 flex items-center justify-center z-50">
      <Circles height="80" width="80" color="#7c3aed" ariaLabel="loading" />
    </div>
  );
}

export default Loader;
