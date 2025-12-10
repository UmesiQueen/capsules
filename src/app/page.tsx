"use client";
import * as React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Capsule from "@/components/CapsuleCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";
import TextRevealAnimation from "@/components/TextRevealAnimation";

export default function Home() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
    });

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

    // choose the one text animation
    const chooseTextElements = document.querySelectorAll(".chooseText");
    gsap.to(chooseTextElements, {
      clipPath: "inset(0% 0 -20px 0)",
      y: "0",
      scrollTrigger: {
        trigger: chooseTextElements,
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });

    // capsule cards content animation
    const contentRevealAnimation = (card: string) => {
      const capsuleDialogBtn = document.querySelector(
        `.capsule-container .${card} .dialog-btn`
      );
      const capsuleCardDescription = document.querySelector(
        `.capsule-container .${card} .card-description`
      );
      const capsuleCardTitle = document.querySelector(
        `.capsule-container .${card} .card-title`
      );
      const splitCardTitle = SplitText.create(capsuleCardTitle, {
        type: "chars",
        mask: "chars",
      });

      const textRevealTl = gsap
        .timeline({ paused: true })
        .add("fadeIn")
        .from(splitCardTitle.chars, { x: "100%", autoAlpha: 0 }, "fadeIn")
        .fromTo(
          capsuleCardDescription,
          { x: "20%", opacity: 0 },
          { x: "0%", opacity: 1, ease: "power4.out" },
          "fadeIn"
        )
        .fromTo(
          capsuleDialogBtn,
          { opacity: 0, height: 0, width: 0 },
          {
            opacity: 1,
            height: "40px",
            width: "40px",
            ease: "power4.out",
          },
          "fadeIn"
        );
      return textRevealTl;
    };
    // create instances for each card
    const card1RevealTl = contentRevealAnimation("card1");
    const card2RevealTl = contentRevealAnimation("card2");
    const card3RevealTl = contentRevealAnimation("card3");

    const scrollIndicator = gsap
      .timeline({ paused: true })
      .fromTo(
        ".scroll-indicator",
        { autoAlpha: 0, x: 20 },
        { autoAlpha: 1, x: 0 }
      );

    const capsuleContainer = document.querySelector(".capsule-container");
    const capsuleCardsTl = gsap.timeline({
      scrollTrigger: {
        trigger: capsuleContainer,
        start: "top top",
        end: "+=500%",
        pin: true,
        scrub: 1,
        onUpdate: (timeline) => {
          gsap.to(".capsule-progress", {
            width: `${timeline.progress * 100}%`,
          });
        },
      },
    });

    capsuleCardsTl
      .add("card1OnEnter")
      .fromTo(
        ".capsule-container .card1 .capsule-card",
        {
          height: "50%",
          width: "50%",
          borderRadius: "100px",
        },
        {
          height: "calc(100% - 16px)",
          width: "100%",
          borderRadius: "50px",
        },
        "card1OnEnter"
      )
      .fromTo(
        ".capsule-container .card1 .capsule-marquee",
        { opacity: 1 },
        { opacity: 0 },
        "card1OnEnter"
      )
      .fromTo(
        ".capsule-container .card1 .card-img",
        { scale: 1.3 },
        { scale: 1 },
        "card1OnEnter"
      )
      .fromTo(
        ".capsule-container .card1 .card-smoke",
        { opacity: 0 },
        { opacity: 0.5 },
        "card1OnEnter"
      )
      .add("contentReveal")
      .to(
        {},
        {
          duration: 0.15,
          onStart: () => {
            card1RevealTl.play();
            scrollIndicator.play();
          },
          onReverseComplete: () => {
            card1RevealTl.reverse();
            scrollIndicator.reverse();
          },
        },
        "contentReveal"
      )
      .add("card1OnLeave")
      .to(
        ".capsule-container .card1 .capsule-card",
        { scale: 0.9 },
        "card1OnLeave"
      )
      .fromTo(
        ".capsule-container .card1 .overlay",
        { autoAlpha: 0 },
        { autoAlpha: 1 },
        "card1OnLeave"
      )
      .add("card2OnEnter", "<")
      .fromTo(
        ".capsule-container .card2",
        { y: "100dvh" },
        { y: "0dvh" },
        "card2OnEnter"
      )
      .fromTo(
        ".capsule-container .card2 .card-img",
        { scale: 1.3 },
        { scale: 1 },
        "card2OnEnter"
      )
      .add("card2ContentReveal")
      .to(
        {},
        {
          duration: 0.15,
          onStart: () => {
            card2RevealTl.play();
          },
          onReverseComplete: () => {
            card2RevealTl.reverse();
          },
        },
        "card2ContentReveal"
      )
      .add("card2OnLeave")
      .to(".capsule-container .card2", { scale: 0.9 }, "card2OnLeave")
      .fromTo(
        ".capsule-container .card2 .overlay",
        { autoAlpha: 0 },
        { autoAlpha: 1 },
        "card2OnLeave"
      )
      .add("card3OnEnter", "<")
      .fromTo(
        ".capsule-container .card3",
        { y: "100dvh" },
        { y: "0dvh" },
        "card3OnEnter"
      )
      .fromTo(
        ".capsule-container .card3 .card-img",
        { scale: 1.3 },
        { scale: 1 },
        "card3OnEnter"
      )
      .add("card3ContentReveal")
      .to(
        {},
        {
          duration: 0.15,
          onStart: () => {
            card3RevealTl.play();
          },
          onReverseComplete: () => {
            card3RevealTl.reverse();
          },
        },
        "card3ContentReveal"
      );
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="p-2 font-sans">
          <section className="mb-20">
            <div className="min-h-[calc(100vh-16px)] rounded-[50px] relative overflow-hidden">
              <div className="hero h-full w-full bg-[url('/img/cap1.png')] scale-[1] bg-no-repeat bg-center bg-cover absolute top-0 left-0 saturate-[120%]" />
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
                  {/* change this to h1 with splitText */}
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
              <div className="chooseText [clip-path:inset(100%_0_-20px_0)] -translate-y-[50px]">
                <div>Choose the one</div>
              </div>
              <div className="chooseText [clip-path:inset(100%_0_-20px_0)] -translate-y-[50px] ">
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
          <section className="capsule-container relative h-dvh">
            <div className="card1 absolute left-0 top-0 h-full w-full z-0">
              <div className="h-dvh w-full relative overflow-hidden flex items-center justify-center">
                <div className="capsule-marquee w-full flex items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
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
              </div>
            </div>
            {/* Terrance */}
            <div className="card2 absolute left-0 top-0 h-full w-full z-1 translate-y-[100dvh] py-2">
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
            </div>
            {/* Desert */}
            <div className=" card3 absolute left-0 top-0 h-full w-full z-2 translate-y-[100dvh] py-2">
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
            <div className="scroll-indicator absolute top-1/2 bottom-1/2 -translate-y-1/2 right-5 z-10">
              <p className="text-[40px] text-white/50">(Scroll)</p>
            </div>
            <div className="scroll-indicator absolute bottom-15 right-5 w-80 h-[2px] rounded-md bg-white/30 z-10 inline-flex overflow-hidden">
              <div className="capsule-progress w-0 h-full bg-white" />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
