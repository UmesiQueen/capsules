"use client";
import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import Houses from "@/components/houses";
import Menu from "@/components/menu";
import Feedback from "@/components/feedback";
import Activities from "@/components/activities";
import Introduction from "@/components/introduction";
import WhySection from "@/components/why";
import Footer from "@/components/footer";
import Welcome from "@/components/welcome";

declare global {
  interface Window {
    lenis?: Lenis;
  }
}

export default function Home() {
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Make lenis globally accessible if needed
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      delete window.lenis;
    };
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

    const overlay = document.querySelector(".reveal-overlay") as HTMLElement;
    const revealTl = gsap.timeline({
      onComplete: () => {
        overlay.remove();
        ScrollTrigger.refresh();
      },
    });

    revealTl
      // Animate a radial gradient that creates transparency from center outward
      .fromTo(
        overlay,
        {
          background:
            "radial-gradient(circle at center, transparent 0%, #181717 0%)",
        },
        {
          background:
            "radial-gradient(circle at center, transparent 150%, #181717 150%)",
          duration: 2,
          ease: "power3.inOut",
        },
      );

    // choose section text animation
    const chooseContainer = document.querySelector(".choose-container");
    const chooseSubText = document.querySelector(".choose-sub");
    const chooseTexts = document.querySelectorAll(".choose-text");
    const splitChooseWords = SplitText.create(chooseTexts, {
      type: "words",
      mask: "words",
    });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: chooseContainer,
          start: "top 90%",
          end: "bottom center",
          scrub: true,
        },
      })
      .addLabel("start")
      .from(chooseSubText, { autoAlpha: 0, duration: 0.2 }, "start")
      .addLabel("end", "<0.1")
      .from(splitChooseWords.words, { y: "-100%" }, "end");

    // discover section text animation
    const discoverContainer = document.querySelector(".discover-container");
    const discoverSubText = document.querySelector(".discover-sub");
    const discoverTexts = document.querySelectorAll(".discover-text");
    const splitDiscoverWords = SplitText.create(discoverTexts, {
      type: "words",
      mask: "words",
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: discoverContainer,
          start: "top 90%",
          end: "bottom center",
          scrub: true,
        },
      })
      .addLabel("start")
      .from(discoverSubText, { autoAlpha: 0, duration: 0.2 }, "start")
      .addLabel("end", "<0.1")
      .from(splitDiscoverWords.words, { y: "-100%" }, "end");

    const discoverLevelsContainer = document.querySelector(".discover-levels");
    const levelOne = document.querySelector(".discover-levels .level-1");
    const levelTwo = document.querySelector(".discover-levels .level-2");
    const levelThree = document.querySelector(".discover-levels .level-3");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: discoverLevelsContainer,
          start: "top center",
          end: "+=1.5%",
          scrub: true,
        },
      })
      .addLabel("start")
      .to(levelOne, { width: "45%", ease: "power2.in" }, "start")
      .to(levelTwo, { width: "85%", ease: "power2.in" }, "start")
      .to(levelThree, { width: "65%", ease: "power2.in" }, "start");
  });

  return (
    <div className="font-sans">
      <div className=" reveal-overlay h-dvh w-full fixed top-0 bottom-0 z-[9999] bg-dark-brown" />
      <Menu />
      <Welcome />
      <Introduction />
      <div className="from-[#181717] via-[#b1a6962f] to-[#181717] bg-gradient-to-b">
        <section className="px-5 md:px-7 mb-20">
          <div className="choose-container">
            <p className="choose-sub text-sm pb-8">
              Discover available Capsules®
            </p>
            <div className="text-[clamp(20px,12vw,184px)] leading-none">
              <div className="choose-text">Choose the one</div>
              <div className="choose-text">you like best</div>
            </div>
          </div>
          <div className="mt-10 pb-10 flex flex-col md:flex-row gap-y-10 *:w-full *:flex-grow ">
            <div className="text-[clamp(20px,7vw,38px)] tracking-wide leading-none md:leading-10 text-light-brown">
              <p>
                You can choose one of three <br className="hidden md:block" />{" "}
                premium capsule houses in our <br className="hidden md:block" />{" "}
                offer. Each of our capsules provides
                <br className="hidden md:block" />
                the highest quality and meets the
                <br className="hidden md:block" />
                standards adjusted to your needs.
              </p>
              <p>Choose the one you like.</p>
            </div>
            <div>
              <p className="text-sm font-semibold">
                All Capsules® houses—has built <br />
                based on the same rules:
              </p>
              <ul className="py-10 *:border-2 *:rounded-full *:w-fit *:px-4 md:*:px-6 *:py-2 md:*:py-3 flex flex-wrap gap-2 text-[clamp(15px,6vw,38px)]  tracking-wide leading-10 *:odd:text-light-brown">
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
      </div>
      <Houses />
      <section className="flex flex-col items-center justify-center text-center h-svh">
        <div className="mb-10 text-[15px] text-light-brown tracking-[-0.2] leading-[23px] font-semibold">
          Closer than you think
        </div>
        <div className="px-2 text-[clamp(20px,12vw,90px)] md:tracking-[-4px] leading-none md:leading-[96px]">
          Our Capsules® are located <br />
          near Los Angeles with easy <br />
          <span className="underline text-light-brown underline-offset-[10px] decoration-from-font decoration-solid cursor-pointer">
            access by road.
          </span>
        </div>
      </section>
      <WhySection />
      <section className="mt-40 px-5">
        <div className="discover-container">
          <p className="discover-sub text-sm pb-8">Ready for an adventure?</p>
          <div className="text-[clamp(20px,12vw,184px)] leading-none">
            <div className="discover-text">Discover the</div>
            <div className="discover-text">desert activities</div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-y-10 gap-x-35 w-full *:w-full *:flex-1 mt-10">
          <div className="space-y-6">
            <p className="font-semibold tracking-wider text-sm leading-none">
              Offered Capsules® activity have different levels of difficulty:
            </p>
            <ul className="discover-levels space-y-4">
              <li className="space-y-4">
                <div className="flex gap-x-2 justify-between items-start text-light-brown">
                  <p className="text-[20px] md:text-[27px] font-medium">Easy</p>
                  <p>3-5h duration</p>
                </div>
                <div className="bg-pale-white/40 relative overflow-hidden h-[2px] w-full">
                  <div className="level-1 absolute top-0 left-0 h-full bg-pale-white" />{" "}
                </div>
              </li>
              <li className="space-y-4">
                <div className="flex gap-x-2 justify-between items-start text-light-brown">
                  <p className="text-[20px] md:text-[27px] font-medium">
                    Medium
                  </p>
                  <p>8-12h duration</p>
                </div>
                <div className="bg-pale-white/40 relative overflow-hidden h-[2px] w-full">
                  <div className="level-2 absolute top-0 left-0 h-full bg-pale-white" />
                </div>
              </li>
              <li className="space-y-4">
                <div className="flex gap-x-2 justify-between items-start text-light-brown">
                  <p className="text-[20px] md:text-[27px] font-medium">Hard</p>
                  <p>24h duration</p>
                </div>
                <div className="bg-pale-white/40 relative overflow-hidden h-[2px] w-full">
                  <div className="level-3 absolute top-0 left-0 h-full bg-pale-white" />
                </div>
              </li>
            </ul>
          </div>
          <div className="text-[clamp(15px,7vw,38px)] font-normal md:font-medium tracking-tight leading-none md:leading-10 text-light-brown md:text-nowrap">
            We want to make sure your stay is <br className="hidden md:block" />
            exciting and enjoyable. That’s why we{" "}
            <br className="hidden md:block" />
            offer a variety of activities with different{" "}
            <br className="hidden md:block" />
            levels of engagement. Whether you seek{" "}
            <br className="hidden md:block" />
            thrills or tranquility, there’s something for{" "}
            <br className="hidden md:block" />
            everyone to make your desert stay truly{" "}
            <br className="hidden md:block" />
            memorable.
          </div>
        </div>
      </section>
      <Activities />
      <Feedback />
      <Footer />
    </div>
  );
}
