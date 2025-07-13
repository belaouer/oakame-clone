"use client";

import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { useEffect, useRef } from "react";

interface NavItemProps {
  text?: string;
  Icon?: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string;
      titleId?: string;
    } & React.RefAttributes<SVGSVGElement>
  >;
  isIcon?: boolean;
  isCheveron?: boolean;
}

const NavItem = ({
  text,
  Icon,
  isIcon = false,
  isCheveron = false,
}: NavItemProps) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  useEffect(() => {
    if (!hoverRef.current || !boxRef.current) return;

    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });

      tl.current
        .to(
          boxRef.current,
          {
            opacity: 0,
            y: -20,
            duration: 0.2,
            ease: "power2.out",
          },
          0
        )
        .to(
          hoverRef.current,
          {
            top: 0,
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0
        ); // <- même point de départ
    }, boxRef);

    return () => ctx.revert();
  }, []);

  const handleMouseEnter = () => {
    tl.current?.play();
  };

  const handleMouseLeave = () => {
    tl.current?.reverse();
  };

  return (
    <div
      className="nav-item-wrapper relative w-full h-full cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Affichage principal */}
      <div
        ref={boxRef}
        className="flex justify-center items-center w-full h-full space-x-1"
      >
        {/* Si Icon uniquement */}
        {isIcon && Icon && <Icon className="w-5 h-5" />}

        {/* Si texte uniquement */}
        {!isIcon && text && <span>{text}</span>}

        {/* Si texte + chevron */}
        {!isIcon && text && isCheveron && (
          <ChevronDownIcon className="w-4 h-4" />
        )}
      </div>

      {/* Contenu animé (hover) */}
      <div
        ref={hoverRef}
        className="absolute top-full bg-[#403a34] text-white flex justify-center items-center space-x-1 w-full h-full"
      >
        {/* Réutilise la même logique d'affichage pour le hover */}
        {isIcon && Icon && <Icon className="w-5 h-5" />}
        {!isIcon && text && <span>{text}</span>}
        {!isIcon && text && isCheveron && <ChevronUpIcon className="w-4 h-4" />}
      </div>
    </div>
  );
};

export default NavItem;
