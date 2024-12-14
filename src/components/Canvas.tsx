"use client";

import { FunctionComponent, useRef } from "react";

const Canvas: FunctionComponent = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  return (
    <div className="relative w-full h-full">
      <canvas
        id="canvas"
        ref={ref}
        width={1000}
        height={1000}
        className="absolute w-full h-full"
        tabIndex={1}
      />
    </div>
  );
};

export default Canvas;
