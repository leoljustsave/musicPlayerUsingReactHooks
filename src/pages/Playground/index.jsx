import React, { useState, useEffect, useRef } from "react";
import { PlaygroundContent } from "./style";
import { Link } from "react-router-dom";

const Playground = (props) => {
  return (
    <PlaygroundContent>
      PLAYGROUND
      <Link to="index">back</Link>
    </PlaygroundContent>
  );
};

export default Playground;
