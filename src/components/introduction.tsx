"use client";
import React from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Introduction() {
  return (
    <>
      <section id="introduction" className="px-5 md:px-10 mb-20 md:mb-50">
        <div className="text-[clamp(20px,10vw,80px)] tracking-tighter md:py-36">
          <TextRevealAnimation>
            <p>
              Welcome to a world of wild California{" "}
              <br className="hidden md:block" />
              desert with Capsules®, where you will{" "}
              <br className="hidden md:block" />
              discover exquisite nature observing it{" "}
              <br className="hidden md:block" />
              from capsule houses, nestled in the{" "}
              <br className="hidden md:block" />
              one of the most breathtaking <br className="hidden md:block" />
              destination on the United States.
            </p>
          </TextRevealAnimation>
        </div>
        <div className="flex flex-col xl:flex-row gap-y-10 items-center justify-between mt-20 md:mt-0 *:w-full *:flex-grow">
          <div className="inline-flex flex-wrap justify-center">
            <Image
              src={"/img/welcome-1.png"}
              alt="rocks"
              width={500}
              height={500}
              className="h-1/2 lg:h-48 w-fit rounded-full"
            />
            <Image
              src={"/img/welcome-2.png"}
              alt="people"
              width={500}
              height={500}
              className="h-1/2 lg:h-48 w-fit rounded-full"
            />
          </div>
          <div className="text-[clamp(20px,7vw,38px)] tracking-wide leading-none md:leading-10 text-light-brown">
            <div>
              <p>
                A place where you can be with
                <br className="hidden md:block" /> yourself and your loved ones.
              </p>
              <p>
                A place where you can experience{" "}
                <br className="hidden md:block" />
                unforgettable desert things.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

interface TextRevealAnimationProps {
  children: React.ReactNode;
}

function TextRevealAnimation({ children }: TextRevealAnimationProps) {
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
    { scope: containerRef },
  );

  return <div ref={containerRef}>{children}</div>;
}
