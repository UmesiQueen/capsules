import React from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

export default function Welcome() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    // hero section background zoom effect
    const hero = document.querySelector(".hero") as HTMLDivElement;
    gsap.to(hero, {
      scale: 1.1,
      paused: true,
      scrollTrigger: {
        trigger: hero,
        start: "top top", // Start when top of element hits top of viewport
        end: "bottom 25%", // End when bottom of element hits 25% of viewport
        scrub: true,
      },
    });
  });

  return (
    <>
      <section id="welcome" className="p-2 mb-20 min-h-[600px] h-svh">
        <div className="h-full w-full rounded-[50px] shadow-2xl relative overflow-hidden">
          <div className="hero h-full w-full bg-[url('/img/cap1.png')] scale-[1] bg-no-repeat bg-center bg-cover absolute top-0 left-0 contrast-110" />
          <video
            width="320"
            height="240"
            autoPlay
            muted
            playsInline
            loop
            className="absolute top-0 left-0 w-full h-full object-cover opacity-[0.6] mix-blend-hard-light scale-[1.75]"
          >
            <source src="/img/smoke_final.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="h-full w-full absolute top-0 left-0">
            <div className="h-full w-full flex flex-col justify-between gap-8 px-3 md:px-6 py-7">
              {/* change this to h1 with splitText */}
              <Image
                src={"/img/capsule.svg"}
                alt="Capsules Logo"
                width={500}
                height={500}
                className="h-48 mt-20 md:mt-0 w-fit"
              />
              <div className="flex flex-col md:flex-row gap-y-2 gap-x-4 justify-between md:items-end">
                <p className="text-[clamp(15px,7vw,38px)] tracking-wide leading-none md:leading-10">
                  Closer to <br /> Nature—Closer <br /> to Yourself
                </p>
                <div>
                  <p className="font-semibold text-sm mb-4 pr-2">
                    Spend unforgettable and remarkable time <br />
                    in the Californian desert with—Capsules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
