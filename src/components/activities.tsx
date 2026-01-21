import React from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Activities() {
  const activityRef = React.useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);
      // Horizontal scroll animation on Activity section
      const activityContainer = document.querySelector(
        ".activity-container",
      ) as HTMLElement;
      if (!activityContainer) return;
      const childActivityElements = Array.from(
        activityContainer.children,
      ) as HTMLElement[];

      const activityTl = gsap
        .timeline({
          scrollTrigger: {
            trigger: activityContainer,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
        .addLabel("start")
        .to(
          childActivityElements,
          {
            x: () =>
              -(activityContainer.scrollWidth - activityContainer.offsetWidth),
          },
          "start",
        );

      childActivityElements.forEach((element) => {
        const image = element.querySelector(".activity-img") as HTMLDivElement;
        activityTl.fromTo(image, { x: 0 }, { x: "-10%" }, "start");
      });
    },
    { scope: activityRef },
  );
  
  return (
    <div ref={activityRef}>
      <section id="activities" className="mt-50 pb-20 md:pb-50">
        <div className="activity-container h-dvh w-full overflow-hidden flex gap-2 p-2">
          <div
            className="activity-1 h-full w-screen flex-shrink-0"
            style={{ width: "80vw" }}
          >
            <div className="rounded-[50px] overflow-hidden relative h-full w-full">
              <div className="activity-img w-full h-full">
                <Image
                  src="/img/activities-1.png"
                  alt="Activities boggy rides"
                  width={500}
                  height={500}
                  className="object-cover object-center scale-[1.2] w-full h-full"
                />
              </div>
              <div className="absolute top-0 left-0 w-full h-full z-1 flex flex-col justify-between px-4 md:px-6 py-6 md:py-10 text-white">
                <div className="flex flex-col-reverse md:flex-row justify-between md:items-start">
                  <h3 className="text-4xl font-semibold">
                    Buggy tours <br /> in the desert
                  </h3>
                  <div className="rounded-full py-1 px-2 border-2 font-semibold text-sm ml-auto">
                    Easy
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-y-1 justify-between md:items-center">
                  <p className="text-sm font-semibold">
                    Explore the terrain on a guided buggy tour that takes{" "}
                    <br className="hidden md:block" />
                    you through the deserts vast&apos;s and open landscapes.
                  </p>
                  <div className="ml-auto flex gap-x-[4px]">
                    <div className="rounded-full border-2 w-10 h-10 inline-flex justify-center items-center text-sm font-semibold">
                      <span>01</span>
                    </div>
                    <div className="rounded-full border-2 border-white/50 text-white/50 w-10 h-10 inline-flex justify-center items-center text-sm font-semibold">
                      <span>03</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="activity-2 h-full w-screen flex-shrink-0"
            style={{ width: "80vw" }}
          >
            <div className="rounded-[50px] overflow-hidden relative h-full w-full">
              <div className="activity-img w-full h-full">
                <Image
                  src="/img/activities-2.png"
                  alt="Activities sandy hikes"
                  width={500}
                  height={500}
                  className="object-cover object-center scale-[1.2] w-full h-full"
                />
              </div>
              <div className="absolute top-0 left-0 w-full h-full z-1 flex flex-col justify-between px-4 md:px-6 py-6 md:py-10 text-white">
                <div className="flex flex-col-reverse md:flex-row justify-between md:items-start">
                  <h3 className="text-4xl font-semibold">
                    Breathtaking <br /> desert hikes
                  </h3>
                  <div className="rounded-full py-1 px-2 border-2 font-semibold text-sm ml-auto">
                    Medium
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-y-1 justify-between md:items-center">
                  <p className="text-sm font-semibold">
                    Set out on a hike that offers clear trails, stunning views,{" "}
                    <br className="hidden md:block" />
                    and a closer look at the unique desert environment.
                  </p>
                  <div className="ml-auto flex gap-x-[4px]">
                    <div className="rounded-full border-2 w-10 h-10 inline-flex justify-center items-center text-sm font-semibold">
                      <span>02</span>
                    </div>
                    <div className="rounded-full border-2 border-white/50 text-white/50 w-10 h-10 inline-flex justify-center items-center text-sm font-semibold">
                      <span>03</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="activity-3  h-full w-screen flex-shrink-0"
            style={{ width: "80vw" }}
          >
            <div className="rounded-[50px] overflow-hidden relative h-full w-full">
              <div className="activity-img w-full h-full">
                <Image
                  src="/img/activities-3.png"
                  alt="Activities rock climbing"
                  width={500}
                  height={500}
                  className="object-cover object-top-right md:object-center scale-[1.2] w-full h-full"
                />
              </div>
              <div className="absolute top-0 left-0 w-full h-full z-1 flex flex-col justify-between px-4 md:px-6 py-6 md:py-10 text-white">
                <div className="flex flex-col-reverse md:flex-row justify-between md:items-start">
                  <h3 className="text-4xl font-semibold">
                    Exciting group <br /> rock climbing
                  </h3>
                  <div className="rounded-full py-1 px-2 border-2 font-semibold text-sm ml-auto">
                    Hard
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-y-1 justify-between md:items-center">
                  <p className="text-sm font-semibold">
                    Climbing session on natural sandstone formations, designed
                    <br className="hidden md:block" />
                    to be both challenging and safe while fostering teamwork.
                  </p>
                  <div className="ml-auto flex gap-x-[4px]">
                    <div className="rounded-full border-2 w-10 h-10 inline-flex justify-center items-center text-sm font-semibold">
                      <span>03</span>
                    </div>
                    <div className="rounded-full border-2 border-white/50 text-white/50 w-10 h-10 inline-flex justify-center items-center text-sm font-semibold">
                      <span>03</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
