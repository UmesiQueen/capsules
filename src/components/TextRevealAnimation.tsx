"use client";
import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TextRevealAnimationProps {
  children: React.ReactNode;
}

export default function TextRevealAnimation({
  children,
}: TextRevealAnimationProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      if (!containerRef.current) return;
      const container = containerRef.current;
      const lines = Array.from(container.children) as HTMLElement[];

      lines.forEach((line) => {
        const cloned = line.cloneNode(true) as HTMLElement;
        cloned.classList.add("clip-text-clone");
        line.appendChild(cloned);
        line.classList.add("clip-text-original");


        gsap.to(cloned, {
          clipPath: "inset(0 0 0% 0)",
          scrollTrigger: {
            trigger: cloned,
            start: "top 70%",
            end: "bottom 50%",
            scrub: true,
          },
        });
      });
    },
    { scope: containerRef }
  );

  return <div ref={containerRef}>{children}</div>;
}
