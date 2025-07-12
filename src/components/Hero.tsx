"use client";
import gsap from "gsap";
import { Flip } from "gsap/all";
import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";

interface HeroProps {
  introFinished: boolean;
  imageRef: React.RefObject<HTMLImageElement | null>;
}
gsap.registerPlugin(Flip);
const Hero = ({ introFinished, imageRef }: HeroProps) => {
  const borderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasNotifiedHeader = useRef(false);
  const [canAnimHeader, setCanAnimHeader] = useState(false);
  const tl = gsap.timeline();
  useEffect(() => {
    const border = borderRef.current;
    if (!border) return;

    const top = border.querySelector(".border-top");
    const right = border.querySelector(".border-right");
    const bottom = border.querySelector(".border-bottom");
    const left = border.querySelector(".border-left");
    if (introFinished && imageRef.current) {
      // Get the initial state
      const state = Flip.getState(imageRef.current);
      containerRef.current?.appendChild(imageRef.current);
      Flip.from(state, {
        duration: 1,
        fade: true,
        absolute: true,
        toggleClass: "flipping",
        ease: "power1.inOut",
      });
      tl.fromTo(
        top,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 1, ease: "cubic-bezier(0.76, 0, 0.24, 1)" }
      )
        .fromTo(
          bottom,
          { scaleX: 0, transformOrigin: "right" },
          { scaleX: 1, duration: 1, ease: "cubic-bezier(0.76, 0, 0.24, 1)" },
          "+="
        )
        .fromTo(
          left,
          { scaleY: 0, transformOrigin: "bottom" },
          { scaleY: 1, duration: 1, ease: "cubic-bezier(0.76, 0, 0.24, 1)" },
          "+="
        )
        .fromTo(
          right,
          { scaleY: 0, transformOrigin: "top" },
          {
            scaleY: 1,
            duration: 1,
            ease: "cubic-bezier(0.76, 0, 0.24, 1)",
            onUpdate: function () {
              if (!hasNotifiedHeader.current && this.progress() >= 0.5) {
                setCanAnimHeader(true);
              }
            },
          },
          "+="
        );
    }
  }, [introFinished]);
  return (
    <section className="w-screen h-screen p-8">
      <div
        className="border-container w-full h-full relative p-[1px]"
        ref={borderRef}
      >
        <Header canAnimHeader={canAnimHeader} tl={tl} />
        <div className="relative w-full h-full" ref={containerRef}></div>
        {/* Bordures animées */}
        <div className="border-top absolute top-0 left-0 h-[1px] w-full bg-black origin-left scale-x-0" />
        <div className="border-bottom absolute bottom-0 right-0 h-[1px] w-full bg-black origin-right scale-x-0" />
        <div className="border-left absolute bottom-0 left-0 w-[1px] h-full bg-black origin-bottom scale-y-0" />
        <div className="border-right absolute top-0 right-0 w-[1px] h-full bg-black origin-top scale-y-0" />
      </div>
    </section>
  );
};

export default Hero;
