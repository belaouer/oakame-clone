"use client";

import React, { useRef, useState } from "react";
import Hero from "./Hero";
import Intro from "./Intro";

const App = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <div className="font-spectral text-[#403a34]">
      <Intro setIntroFinished={setIntroFinished} imageRef={imageRef} />
      <Hero introFinished={introFinished} imageRef={imageRef} />
    </div>
  );
};

export default App;
