"use client";

import React, { useRef, useState } from "react";
import Hero from "./Hero";
import Intro from "./Intro";

const App = () => {
  const [introFinished, setIntroFinished] = useState(false);
  const [heroFinished, setHeroFinished] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <div className="font-spectral text-[#403a34]">
      {!heroFinished && (
        <Intro setIntroFinished={setIntroFinished} imageRef={imageRef} />
      )}

      <Hero
        introFinished={introFinished}
        setHeroFinished={setHeroFinished}
        imageRef={imageRef}
      />
    </div>
  );
};

export default App;
