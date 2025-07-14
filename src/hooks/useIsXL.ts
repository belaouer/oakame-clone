// hooks/useIsXL.ts
"use client";
import { useEffect, useState } from "react";

export default function useIsXL() {
  const [isXL, setIsXL] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateMatch = () => setIsXL(mediaQuery.matches);

    updateMatch(); // check on mount
    mediaQuery.addEventListener("change", updateMatch);

    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, []);

  return isXL;
}
