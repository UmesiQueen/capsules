"use client";
import * as React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Capsule from "@/components/CapsuleCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger } from "gsap/all";
import TextRevealAnimation from "@/components/TextRevealAnimation";

export default function Home() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const chooseTextRef = React.useRef<HTMLDivElement>(null);
  const bestTextRef = React.useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
    });

    // hero section background zoom effect
    if (!containerRef.current) return;
    const container = containerRef.current;

    gsap.to(container, {
      scale: 1.1,
      paused: true,
      scrollTrigger: {
        trigger: container,
        start: "top top", // Start when top of element hits top of viewport
        end: "bottom 25%", // End when bottom of element hits 25% of viewport
        scrub: true,
      },
    });

    // choose the one text animation
    if (!chooseTextRef.current && !bestTextRef.current) return;
    const chooseText = chooseTextRef.current;
    const bestText = bestTextRef.current;

    gsap.to([chooseText, bestText], {
      clipPath: "inset(0% 0 -20px 0)",
      y: "0",
      scrollTrigger: {
        trigger: [chooseText, bestText],
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="p-2 font-sans">
          <section className="mb-20">
            <div className="min-h-[calc(100vh-16px)] rounded-[50px] relative overflow-hidden">
              <div
                ref={containerRef}
                className="h-full w-full bg-[url('/img/cap1.png')] scale-[1] bg-no-repeat bg-center bg-cover absolute top-0 left-0 saturate-[120%]"
              />
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
                <div className="h-full w-full flex flex-col justify-between gap-8 px-6 py-7">
                  <Image
                    src={"/img/capsule.svg"}
                    alt="Capsules Logo"
                    width={500}
                    height={500}
                    className="h-48 w-fit"
                  />
                  <div className="flex gap-4 justify-between items-end ">
                    <p className="font-medium text-[38px] tracking-wide leading-10 ">
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
          <section className="px-7 pb-10">
            <div className="text-[80px] tracking-tighter py-36">
              <TextRevealAnimation>
                <p>Welcome to a world of wild California</p>
                <p>desert with Capsules®, where you will</p>
                <p>discover exquisite nature observing it</p>
                <p>from capsule houses, nestled in the</p>
                <p>one of the most breathtaking</p>
                <p>destination on the United States.</p>
              </TextRevealAnimation>
            </div>
            <div className="flex items-center justify-between *:w-full *:flex-grow pb-40">
              <div className="inline-flex">
                <Image
                  src={"/img/welcome-1.png"}
                  alt="rocks"
                  width={500}
                  height={500}
                  className="h-48 w-fit rounded-full"
                />
                <Image
                  src={"/img/welcome-2.png"}
                  alt="people"
                  width={500}
                  height={500}
                  className="h-48 w-fit rounded-full"
                />
              </div>
              <div className="text-[38px] tracking-wide leading-10 text-light-brown">
                <div className="w-fit">
                  <p>A place where you can be with </p>
                  <p>yourself and your loved ones. </p>
                  <p>A place where you can experience </p>
                  <p>unforgettable desert things.</p>
                </div>
              </div>
            </div>
          </section>
          <section className="px-7 mb-20">
            <div>
              <p className="text-sm pb-5">Discover available Capsules®</p>
            </div>
            <div className="text-[184px] text-nowrap leading-none">
              <div
                ref={chooseTextRef}
                className="[clip-path:inset(100%_0_-20px_0)] -translate-y-[50px] "
              >
                <div>Choose the one</div>
              </div>
              <div
                ref={bestTextRef}
                className="[clip-path:inset(100%_0_-20px_0)] -translate-y-[50px] "
              >
                <div>you like best</div>
              </div>
            </div>
            <div className="mt-8 pb-10 flex *:w-full *:flex-grow ">
              <div className="text-[38px] tracking-wide leading-10 text-light-brown">
                <p>You can choose one of three</p>
                <p>premium capsule houses in our </p>
                <p>offer. Each of our capsules provides </p>
                <p>the highest quality and meets the</p>
                <p>standards adjusted to your needs. </p>
                <p>Choose the one you like.</p>
              </div>
              <div>
                <p className="text-sm font-semibold">
                  All Capsules® houses—has built <br />
                  based on the same rules:
                </p>
                <ul className="py-10 *:border-2 *:rounded-full *:w-fit *:px-6 *:py-3 flex flex-wrap gap-2 text-[38px] tracking-wide leading-10 *:odd:text-light-brown">
                  <li>Sustainable</li>
                  <li>Nature-Care</li>
                  <li>Smart</li>
                  <li>Privacy</li>
                  <li>Spacious</li>
                  <li>Glassed-in</li>
                </ul>
              </div>
            </div>
          </section>
          <section className=" min-h-[calc(100vh-16px)] overflow-hidden">
            <div className="w-full h-[calc(100vh-16px)] flex items-center">
              <Marquee autoFill={true} speed={150}>
                <Image
                  src={"/img/capsule.svg"}
                  alt="Capsules Logo"
                  width={500}
                  height={500}
                  className="h-48 w-fit px-5"
                />
              </Marquee>
            </div>
            <div className="space-y-2">
              {/* Classic */}
              <Capsule
                title={"Classic"}
                description={
                  "Classic Capsule® boasts refined aesthetics and a modern interior, creating an intimate retreat in a desert landscape."
                }
                features={[
                  "22m2",
                  "King Size",
                  "Available",
                  "Available",
                  "Available",
                  "None",
                ]}
                imgSrc={"/img/cap3.png"}
                cost={2000}
              />
              {/* Terrance */}
              <Capsule
                title={"Terrance"}
                description={
                  "The most prestige capsule with the biggest terrace and jacuzzi with an amazing view of Los Angeles."
                }
                features={[
                  "30m2",
                  "King Size",
                  "Available",
                  "Available",
                  "Available",
                  "Available",
                ]}
                imgSrc={"/img/cap2.png"}
                cost={2500}
              />
              {/* Desert */}
              <Capsule
                title={"Desert"}
                description={
                  "With its striking architecture and upscale amenities, Desert Capsule® offers an exclusive retreat in the heart of the desert."
                }
                features={[
                  "28m2",
                  "King Size",
                  "Available",
                  "Available",
                  "Available",
                  "None",
                ]}
                imgSrc={"/img/cap1.png"}
                cost={2250}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
