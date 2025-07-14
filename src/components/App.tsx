"use client";

import React, { useRef, useState } from "react";
import Hero from "./Hero";
import Intro from "./Intro";
import useIsXL from "../hooks/useIsXL";

const App = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const [heroFinished, setHeroFinished] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const isXL = useIsXL();

  const shouldShowIntro = isXL && !heroFinished;

  return (
    <div className="font-spectral text-[#403a34]">
      {shouldShowIntro && (
        <Intro setIntroFinished={setIntroFinished} imageRef={imageRef} />
      )}

      <Hero
        introFinished={!isXL || introFinished} // simulate introFinished=true if not XL
        setHeroFinished={setHeroFinished}
        imageRef={imageRef}
      />
    </div>
  );
};

export default App;
