"use client";
import { useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";

export default function Loader({ children }: { children: React.ReactNode }) {
  const [loadingComplete, setLoadingComplete] = useState(false);
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const splitText = new SplitText(".capsule-text", {
      type: "chars",
      mask: "chars",
    });

    gsap
      .timeline({})
      .addLabel("start")
      .from(
        splitText.chars,
        {
          x: "100%",
          autoAlpha: 0,
          duration: 0.5,
          onComplete: () => {
            gsap.to(".loader", {
              display: "inline-flex",
            });
          },
        },
        "start",
      )
      .to(".sub-text", { y: "0%", duration: 0.5 }, "start")
      .addLabel("fadeIn", ">")
      .fromTo(
        ".loader",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 2.5,
          ease: "expo.inOut",
          onComplete: () => {
            setLoadingComplete(true);
          },
        },
        "fadeIn",
      );
  }, []);

  return (
    <>
      {!loadingComplete ? (
        <div className="loader-container bg-dark-brown min-h-screen min-w-screen relative flex flex-col items-center justify-center font-sans">
          <div className="h-20 md:h-45 w-60 md:w-150 relative *:absolute *:top-0 *:left-0 overflow-hidden">
            <div className="w-full h-full rounded-[100px] bg-black inline-flex items-center justify-center z-0">
              <p className="capsule-text text-2xl md:text-5xl tracking-wide text-pale-white">
                Capsule®
              </p>
            </div>
            <div className="loader hidden h-full w-full rounded-[100px] bg-pale-white items-center justify-center z-1">
              <p className="capsule-text text-2xl md:text-5xl tracking-wide text-black">
                Capsule®
              </p>
            </div>
          </div>
          <div className="h-10 overflow-hidden absolute bottom-10">
            <p className="sub-text text-center text-sm font-semibold leading-none text-pale-white -translate-y-full">
              Meet Capsules®—modern and cozy <br /> houses, in the California
              desserts.
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
