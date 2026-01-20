"use client";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import Capsule from "@/components/CapsuleCard";
import TextRevealAnimation from "@/components/TextRevealAnimation";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Welcome", slug: "welcome" },
  { title: "Introduction", slug: "introduction" },
  { title: "Houses", slug: "houses" },
  { title: "Why Capsules®", slug: "why" },
  { title: "Activities", slug: "activities" },
  { title: "Feedback", slug: "feedback" },
];

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

  React.useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);

    const handleNavClick = (e: Event) => {
      e.preventDefault();
      const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute(
        "href",
      );

      if (targetId) {
        gsap.to(window, {
          duration: 3,
          scrollTo: targetId,
          ease: "power2.inOut",
        });
      }
    };

    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavClick);
    });

    return () => {
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavClick);
      });
    };
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);

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

    // capsule cards content animation
    const contentRevealAnimation = (card: string) => {
      const capsuleDialogBtn = document.querySelector(
        `.capsule-container .${card} .dialog-btn`,
      );
      const capsuleCardDescription = document.querySelector(
        `.capsule-container .${card} .card-description`,
      );
      const capsuleCardTitle = document.querySelector(
        `.capsule-container .${card} .card-title`,
      );
      const splitCardTitle = SplitText.create(capsuleCardTitle, {
        type: "chars",
        mask: "chars",
      });

      const textRevealTl = gsap
        .timeline({ paused: true })
        .addLabel("fadeIn")
        .from(splitCardTitle.chars, { x: "100%", autoAlpha: 0 }, "fadeIn")
        .fromTo(
          capsuleCardDescription,
          { x: "20%", opacity: 0 },
          { x: "0%", opacity: 1, ease: "power4.out" },
          "fadeIn",
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
          "fadeIn",
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
        { autoAlpha: 1, x: 0 },
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
      .addLabel("card1OnEnter")
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
        "card1OnEnter",
      )
      .fromTo(
        ".capsule-container .card1 .capsule-marquee",
        { opacity: 1 },
        { opacity: 0 },
        "card1OnEnter",
      )
      .fromTo(
        ".capsule-container .card1 .card-img",
        { scale: 1.3 },
        { scale: 1 },
        "card1OnEnter",
      )
      .fromTo(
        ".capsule-container .card1 .card-smoke",
        { opacity: 0 },
        { opacity: 0.5 },
        "card1OnEnter",
      )
      .addLabel("contentReveal")
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
        "contentReveal",
      )
      .addLabel("card1OnLeave")
      .to(
        ".capsule-container .card1 .capsule-card",
        { scale: 0.9 },
        "card1OnLeave",
      )
      .fromTo(
        ".capsule-container .card1 .overlay",
        { autoAlpha: 0 },
        { autoAlpha: 1 },
        "card1OnLeave",
      )
      .addLabel("card2OnEnter", "<")
      .fromTo(
        ".capsule-container .card2",
        { y: "100dvh" },
        { y: "0dvh" },
        "card2OnEnter",
      )
      .fromTo(
        ".capsule-container .card2 .card-img",
        { scale: 1.3 },
        { scale: 1 },
        "card2OnEnter",
      )
      .addLabel("card2ContentReveal")
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
        "card2ContentReveal",
      )
      .addLabel("card2OnLeave")
      .to(".capsule-container .card2", { scale: 0.9 }, "card2OnLeave")
      .fromTo(
        ".capsule-container .card2 .overlay",
        { autoAlpha: 0 },
        { autoAlpha: 1 },
        "card2OnLeave",
      )
      .addLabel("card3OnEnter", "<")
      .fromTo(
        ".capsule-container .card3",
        { y: "100dvh" },
        { y: "0dvh" },
        "card3OnEnter",
      )
      .fromTo(
        ".capsule-container .card3 .card-img",
        { scale: 1.3 },
        { scale: 1 },
        "card3OnEnter",
      )
      .addLabel("card3ContentReveal")
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
        "card3ContentReveal",
      );

    // carousel sections
    const carouselContainer = document.querySelector(".capsule-carousel");
    gsap
      .timeline({
        scrollTrigger: {
          trigger: carouselContainer,
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: "labels",
            duration: 3,
            delay: 0.2,
            ease: "power2.inOut",
            directional: false, // Only snap forward, prevents skipping
          },
        },
      })
      .addLabel("firstCarouselTl")
      .to({}, {}, "firstCarouselTl")
      .addLabel("secondCarouselTl")
      .to(
        {},
        {
          onStart: () => {
            secondCarouselTl.play();
          },
          onReverseComplete: () => {
            secondCarouselTl.reverse();
          },
        },
        "secondCarouselTl",
      )
      .addLabel("thirdCarouselTl")
      .to(
        {},
        {
          onStart: () => {
            thirdCarouselTl.play();
          },
          onReverseComplete: () => {
            thirdCarouselTl.reverse();
          },
        },
        "thirdCarouselTl",
      );

    const secondCarouselTl = gsap
      .timeline({ paused: true })
      .addLabel("carousel1OnLeave")
      .fromTo(
        ".capsule-carousel .item-1",
        { scale: 1, autoAlpha: 1 },
        { scale: 0.8, autoAlpha: 0 },
        "carousel1OnLeave",
      )
      .fromTo(
        ".capsule-carousel .item-2",
        { x: "0%" },
        {
          x: "-100%",
          onStart: () => {
            gsap.set(".capsule-carousel .item-2", {
              zIndex: 1,
            });
          },
        },
        "carousel1OnLeave",
      )
      .addLabel("carousel2OnEnter", "<")
      .fromTo(
        ".capsule-carousel .item-2 .bg-1",
        { clipPath: "inset(0% 0 0% 0)" },
        { clipPath: "inset(100% 0 0% 0)" },
        "carousel2OnEnter",
      )
      .fromTo(
        ".capsule-carousel .item-3",
        { y: "0%", x: "100%" },
        { y: "-100%", x: "100%" },
        "carousel2OnEnter",
      );

    const thirdCarouselTl = gsap
      .timeline({ paused: true })
      .addLabel("carousel2OnLeave")
      .fromTo(
        ".capsule-carousel .item-2",
        { scale: 1, autoAlpha: 1 },
        {
          scale: 0.8,
          autoAlpha: 0,
          onStart: () => {
            gsap.set(".capsule-carousel .item-3", {
              zIndex: 2,
            });
          },
        },
        "carousel2OnLeave",
      )
      .addLabel("carousel3OnEnter", "<")
      .fromTo(
        ".capsule-carousel .item-3",
        { x: "100%" },
        { x: "0%" },
        "carousel3OnEnter",
      )
      .fromTo(
        ".capsule-carousel .item-3 .txt-1",
        { clipPath: "inset(0% 0 0% 0)" },
        { clipPath: "inset(100% 0 0% 0)", duration: 0.5 },
        "carousel3OnEnter",
      )
      .fromTo(
        ".capsule-carousel .item-3 .txt-2",
        { y: "100%", clipPath: "inset(100% 0 0% 0)" },
        { y: "0%", clipPath: "inset(0% 0 0% 0)", duration: 0.5 },
        "carousel3OnEnter",
      )
      .fromTo(
        ".capsule-carousel .item-4",
        { y: "0%" },
        { y: "-100%" },
        "carousel3OnEnter",
      );

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

    // review section
    const firstReview = document.querySelectorAll(".review-1");
    const secondReview = document.querySelectorAll(".review-2");
    const thirdReview = document.querySelectorAll(".review-3");
    const nextReviewBtn = document.getElementById("next-review-btn");
    const prevReviewBtn = document.getElementById("prev-review-btn");

    let currentReview = 1; // Track current position (1, 2, or 3)

    const nextReviewTl = gsap
      .timeline({
        paused: true,
        onUpdate: () => {
          const progressPercentage = (currentReview / 3) * 100;
          gsap.to(".review-progress", {
            width: `${progressPercentage}%`,
          });
        },
      })
      .addLabel("review1") // First review position
      .addLabel("Exit1Review")
      .to(firstReview, { y: "-120%", duration: 0.35 }, "Exit1Review")
      .addLabel("Enter2Review", ">")
      .fromTo(
        secondReview,
        { y: "-120%" },
        { y: "0%", duration: 0.35 },
        "Enter2Review",
      )
      .addLabel("review2") // Second review position
      .addLabel("Exit2Review")
      .to(secondReview, { y: "-120%", duration: 0.35 }, "Exit2Review")
      .addLabel("Enter3Review", ">")
      .fromTo(
        thirdReview,
        { y: "-120%" },
        { y: "0%", duration: 0.35 },
        "Enter3Review",
      )
      .addLabel("review3"); // Third review position

    nextReviewBtn?.addEventListener("click", () => {
      if (currentReview < 3) {
        currentReview++;
        nextReviewTl.tweenTo(`review${currentReview}`);
      }
    });

    prevReviewBtn?.addEventListener("click", () => {
      if (currentReview > 1) {
        currentReview--;
        nextReviewTl.tweenTo(`review${currentReview}`);
      }
    });

    // Island section animation
    const islandSection = document.querySelector(".island");
    gsap
      .timeline({
        scrollTrigger: {
          trigger: islandSection,
          start: "top 95%",
          end: "top top",
          scrub: true,
        },
      })
      .addLabel("start")
      .to(".reviews", { opacity: 0 }, "start")
      .fromTo(
        islandSection,
        { borderRadius: "100px" },
        { borderRadius: "50px" },
        "start",
      )
      .fromTo(".island-img", { scale: 1.3 }, { scale: 1 }, "start");
  });

  return (
    <div className="font-sans">
      <section id="welcome" className="p-2 mb-20">
        <div className="min-h-[calc(100vh-16px)] rounded-[50px] relative overflow-hidden">
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
            <div className="h-full w-full flex flex-col justify-between gap-8 px-6 py-7">
              {/* change this to h1 with splitText */}
              <Image
                src={"/img/capsule.svg"}
                alt="Capsules Logo"
                width={500}
                height={500}
                className="h-20 md:h-35 lg:h-48 mt-20 md:mt-0 w-fit"
              />
              <div className="flex flex-col md:flex-row gap-y-2 gap-x-4 justify-between md:items-end">
                <p className="text-[clamp(15px,15vw,38px)] tracking-wide leading-none md:leading-10">
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
      <section id="houses" className="p-2">
        <div className="capsule-container relative h-dvh">
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
          <div className="scroll-indicator absolute top-10 md:top-1/2 md:bottom-1/2 -translate-y-1/2 right-5 z-10">
            <p className="text-[clamp(15px,7vw,40px)] text-white/50">
              (Scroll)
            </p>
          </div>
          <div className="scroll-indicator absolute bottom-5 md:bottom-15 right-5 w-80 h-[2px] rounded-md bg-white/30 z-10 inline-flex overflow-hidden">
            <div className="capsule-progress w-0 h-full bg-white" />
          </div>
        </div>
      </section>
      <section className="flex flex-col items-center justify-center text-center h-dvh">
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
      <section id="why">
        <div className="ml-5 text-[15px] text-white tracking-[-0.2] leading-[23px] font-semibold">
          Want to learn more about <br />
          the benefits of—Capsules®?
        </div>
        <div className="py-10">
          <Marquee autoFill={true} speed={150}>
            <div className="text-[100px] md:text-[170px] leading-none overflow-hidden">
              Why Capsule®?*
            </div>
          </Marquee>
        </div>
        <div className="hidden md:block capsule-carousel p-2 h-dvh">
          <div className="overflow-hidden flex *:flex-grow flex-wrap w-full h-full *:h-full *:w-[calc(50vw-20px)] *:overflow-hidden *:rounded-[50px] *:relative">
            <div className="item-1 bg-bokara-grey">
              <div className="flex flex-col justify-between h-full w-full py-10 px-2 md:px-6">
                <div className="text-light-brown text-[clamp(14px,7vw,38px)] tracking-wide leading-none md:leading-10 font-semibold w-fit">
                  <p>Enjoy the view</p>
                  <p>through —the wide</p>
                  <p>panoramic glass</p>
                  <p>window</p>
                </div>
                <div className="flex flex-col-reverse md:flex-row md:items-center gap-5 justify-between w-full">
                  <div className="flex gap-x-[4px]">
                    <div className="rounded-full border-2 w-8 md:w-10 aspect-square inline-flex justify-center items-center text-sm font-semibold">
                      <span>01</span>
                    </div>
                    <div className="rounded-full border-2 border-white/50 text-white/50 w-8 md:w-10 aspect-square inline-flex justify-center items-center text-sm font-semibold">
                      <span>03</span>
                    </div>
                  </div>
                  <div className="text-sm md:text-base px-1 md:px-0">
                    <p>Get closer to the desert nature than ever before</p>
                    <p>and admire this unique, breathtaking landscape.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-2 relative *:absolute top-0 left-0 *:h-full *:w-full">
              <div className="bg-1 bg-[url('/img/cap3.png')] bg-center bg-cover z-1" />
              <div className="bg-2 bg-[url('/img/cap2.png')] bg-center bg-cover z-0" />
            </div>
            <div className="item-3 bg-bokara-grey">
              <div className="flex flex-col justify-between h-full w-full py-10 px-2 md:px-6">
                <div className="text-light-brown text-[clamp(20px,7vw,38px)] tracking-wide leading-none md:leading-10 font-semibold">
                  <div className="relative overflow-hidden h-10 *:absolute *:top-0 *:left-0 *:w-fit">
                    <p className="txt-1">Sound of silence</p>
                    <p className="txt-2">Relax yourself</p>
                  </div>
                  <div className="relative overflow-hidden h-10 *:absolute *:top-0 *:left-0 *:w-fit">
                    <p className="txt-1">—out of the city</p>
                    <p className="txt-2">in—Wooden</p>
                  </div>
                  <div className="relative overflow-hidden h-10 *:absolute *:top-0 *:left-0 *:w-fit">
                    <p className="txt-1">rush with completely</p>
                    <p className="txt-2">Jacuzzi</p>
                  </div>
                  <div className="relative overflow-hidden h-10 *:absolute *:top-0 *:left-0 *:w-fit">
                    <p className="txt-1">privacy</p>
                  </div>
                </div>
                <div className="flex flex-col-reverse md:flex-row md:items-center gap-5 justify-between w-full *:w-full">
                  <div className="flex gap-x-[4px]">
                    <div className="rounded-full border-2 w-8 md:w-10 aspect-square inline-flex justify-center items-center text-sm font-semibold overflow-hidden">
                      <div className="relative h-5 w-5 *:absolute *:top-0 *:left-0 *:w-full">
                        <span className=" txt-1">02</span>
                        <span className="txt-2">03</span>
                      </div>
                    </div>
                    <div className="rounded-full border-2 border-white/50 text-white/50 w-8 md:w-10 aspect-square inline-flex justify-center items-center text-sm font-semibold">
                      <span>03</span>
                    </div>
                  </div>
                  <div>
                    <div className="relative overflow-hidden h-6 *:absolute *:top-0 *:left-0 *:w-fit">
                      <p className="txt-1">
                        Here, every whisper of nature recharges
                      </p>
                      <p className="txt-2">
                        your soul—your sanctuary of solitude awaits.
                      </p>
                    </div>
                    <div className="relative overflow-hidden h-6 *:absolute *:top-0 *:left-0 *:w-fit">
                      <p className="txt-1">
                        Let the natural textures and gentle bubbles
                      </p>
                      <p className="txt-2">
                        transport you to a realm of pure, handcrafted bliss.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="item-4 bg-[url('/img/cap1.png')] bg-right bg-cover" />
          </div>
        </div>
        {/* Mobile */}
        <div className="block md:hidden p-2">
          <div className=" space-y-6 *:w-full *:overflow-hidden *:rounded-[50px]">
            <div className="item-1 bg-bokara-grey">
              <div className="flex flex-col gap-2 justify-between h-full w-full p-5 pt-10">
                <div className="text-light-brown text-lg tracking-wide leading-none font-semibold w-fit">
                  <p>Enjoy the view</p>
                  <p>through —the wide</p>
                  <p>panoramic glass</p>
                  <p>window</p>
                </div>
                <div className="flex items-center gap-5 justify-between w-full">
                  <div className="flex gap-x-[4px]">
                    <div className="rounded-full border-2 w-8 aspect-square inline-flex justify-center items-center text-xs font-semibold">
                      <span>01</span>
                    </div>
                    <div className="rounded-full border-2 border-white/50 text-white/50 w-8 aspect-square inline-flex justify-center items-center text-xs font-semibold">
                      <span>03</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>
                      Get closer to the desert nature than ever before and
                      admire this unique, breathtaking landscape.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[url('/img/cap3.png')] bg-center bg-cover h-50 w-full rounded-t-[50px]" />
            </div>
            <div className="item-2 bg-bokara-grey">
              <div className="flex flex-col gap-2 justify-between h-full w-full p-5 pt-10">
                <div className="text-light-brown text-lg tracking-wide leading-none font-semibold w-fit">
                  <p>Sound of silence</p>
                  <p>—out of the city</p>
                  <p>rush with completely</p>
                  <p>privacy</p>
                </div>
                <div className="flex items-center gap-5 justify-between w-full">
                  <div className="flex gap-x-[4px]">
                    <div className="rounded-full border-2 w-8 aspect-square inline-flex justify-center items-center text-xs font-semibold">
                      <span>02</span>
                    </div>
                    <div className="rounded-full border-2 border-white/50 text-white/50 w-8 aspect-square inline-flex justify-center items-center text-xs font-semibold">
                      <span>03</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>
                      Here, every whisper of nature recharges Let the natural
                      textures and gentle bubbles
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[url('/img/cap2.png')] bg-center bg-cover h-50 w-full rounded-t-[50px]" />
            </div>
            <div className="item-3 bg-bokara-grey">
              <div className="flex flex-col gap-2 justify-between h-full w-full p-5 pt-10">
                <div className="text-light-brown text-lg tracking-wide leading-none font-semibold w-fit">
                  <p>Relax yourself</p>
                  <p>in—Wooden</p>
                  <p>Jacuzzi</p>
                </div>
                <div className="flex items-center gap-5 justify-between w-full">
                  <div className="flex gap-x-[4px]">
                    <div className="rounded-full border-2 w-8 aspect-square inline-flex justify-center items-center text-xs font-semibold">
                      <span>03</span>
                    </div>
                    <div className="rounded-full border-2 border-white/50 text-white/50 w-8 aspect-square inline-flex justify-center items-center text-xs font-semibold">
                      <span>03</span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p>
                      your soul—your sanctuary of solitude awaits. transport you
                      to a realm of pure, handcrafted.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[url('/img/cap1.png')] bg-center bg-cover h-50 w-full rounded-t-[50px]" />
            </div>
          </div>
        </div>
      </section>
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

      {/* Reviews */}
      <section id="feedback" className="reviews p-5 md:px-10">
        <p className="text-xs pb-8 font-semibold">Do people like us?</p>
        <div className="relative min-h-[300px] md:min-h-[520px]">
          <div>
            <div className="space-y-5">
              <div className="text-[38px] md:text-[80px] text-wrap tracking-tighter leading-[1]">
                {/* line 1 */}
                <div className="h-10 md:h-24 overflow-hidden relative *:absolute *:top-0 *:left-0">
                  <div className="review-1">Staying at Capsule® in the</div>
                  <div className="review-2">Capsule® offered the perfect</div>
                  <div className="review-3">Capsule® was the perfect</div>
                </div>
                {/* line 2 */}
                <div className="h-10 md:h-24 overflow-hidden relative *:absolute *:top-0 *:left-0">
                  <div className="review-1">California desert redefined my</div>
                  <div className="review-2">escape — sleek, modern spaces</div>
                  <div className="review-3">desert hideaway — stylish,</div>
                </div>
                {/* line 3 */}
                <div className="h-10 md:h-24 overflow-hidden relative *:absolute *:top-0 *:left-0">
                  <div className="review-1">retreat — modern design meets</div>
                  <div className="review-2">
                    surrounded by desert stillness.
                  </div>
                  <div className="review-3">peaceful, and fully surrounded</div>
                </div>
                {/* line 4 */}
                <div className="h-10 md:h-24 overflow-hidden relative *:absolute *:top-0 *:left-0">
                  <div className="review-1">nature, and every sunset feels</div>
                  <div className="review-2">Each moment felt peaceful,</div>
                  <div className="review-3">by stunning views day and</div>
                </div>
                {/* line 5 */}
                <div className="h-10 md:h-24 overflow-hidden relative *:absolute *:top-0 *:left-0">
                  <div className="review-1">like a serene masterpiece.</div>
                  <div className="review-2">grounded, and truly unique.</div>
                  <div className="review-3">night.</div>
                </div>
              </div>
              <div className="h-24 overflow-hidden relative *:absolute *:top-0 *:left-0">
                {/* review 1 profile */}
                <div className="review-1 flex gap-5 items-center">
                  <div className="w-10 md:w-15 bg-pink-700 aspect-square rounded-full" />
                  <div>
                    Queen Umesi <br /> (Lagos, Nigeria)
                  </div>
                </div>
                {/* review 2 profile */}
                <div className="review-2 flex gap-5 items-center">
                  <div className="w-10 md:w-15 bg-red-500 aspect-square rounded-full" />
                  <div>
                    Marcus Simpson <br /> (New York)
                  </div>
                </div>
                {/* review 3 profile */}
                <div className="review-3 flex gap-5 items-center">
                  <div className="w-10 md:w-15 aspect-square bg-amber-500 rounded-full" />
                  <div>
                    Jason Whitaker <br /> (San Francisco)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5 justify-between items-center py-5">
          <div className="flex gap-2">
            <Button
              variant="ghost"
              className="border-2 rounded-full p-3"
              id="prev-review-btn"
            >
              ←
            </Button>
            <Button
              variant="ghost"
              className="border-2 rounded-full p-3"
              id="next-review-btn"
            >
              →
            </Button>
          </div>
          <div className="review-scroll-indicator w-100 h-[1.5px] rounded-md bg-white/30 z-10 inline-flex overflow-hidden">
            <div className="review-progress w-1/3 h-full bg-white" />
          </div>
        </div>
      </section>
      <section className=" h-dvh p-2">
        <div className="island h-full w-full relative overflow-hidden">
          <div className="island-img h-full w-full bg-[url('/img/cap2.png')] bg-no-repeat bg-center bg-cover absolute top-0 left-0 saturate-[120%]" />
          <video
            width="320"
            height="240"
            autoPlay
            muted
            playsInline
            loop
            className="absolute top-0 left-0 w-full h-full object-cover opacity-[0.4] mix-blend-hard-light scale-[1.75]"
          >
            <source src="/img/smoke_final.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="h-full w-full absolute top-0 left-0">
            <div className="h-full w-full flex flex-col justify-center md:justify-end gap-30 px-6 py-7">
              {/* change this to h1 with splitText */}
              <Image
                src={"/img/capsule.svg"}
                alt="Capsules Logo"
                width={500}
                height={500}
                className="h-48 w-fit self-center"
              />
              <div className="hidden md:flex flex-row gap-x-4 justify-between items-end">
                <p className="text-[clamp(15px,15vw,38px)] tracking-wide leading-10">
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
      <section className="mt-40">
        <div className="px-5 md:px-10 text-[15px] tracking-tight font-semibold">
          Interested in an amazing adventure?
          <br />
          Reserve one of our Capsules®
        </div>
        <div>
          <Marquee autoFill={true} speed={150} pauseOnHover={true}>
            <div className="text-[100px] md:text-[170px] tracking-tight">
              Book your Capsule®—
            </div>
          </Marquee>
        </div>
        <div className="py-10 md:py-20 px-5 md:px-10 flex flex-col md:flex-row gap-10 justify-between md:items-end">
          <div className="text-2xl md:text-3xl space-y-3 md:space-y-6 text-light-brown">
            <p>
              This website is just the concept{" "}
              <br className="hidden md:block" />
              work done by— Moyra and cloned <br className="hidden md:block" />
              by— Queen to show her capabilities.
            </p>
            <p>If you like this project, give me the job {">_<"}.</p>
          </div>
          <ul className="text-3xl h-full flex flex-col md:items-end">
            {menuItems.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="group cursor-pointer h-9 w-fit overflow-hidden relative"
                >
                  <div className="group-hover:-translate-y-full transition-transform duration-200 h-full capitalize">
                    {item.title}
                  </div>
                  <a
                    href={`#${item.slug}`}
                    className="nav-link text-light-brown z-0 absolute top-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 delay-10 h-full"
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="px-5 md:px-10 flex flex-col md:flex-row gap-y-5 gap-x-10 justify-between items-center">
          <ul className="*:w-12 *:h-12 *:border *:border-light-brown *:rounded-full *:inline-flex *:items-center *:justify-center flex [&_svg]:w-5 [&_svg]:h-5 *:text-pale-white">
            <li>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <title>X</title>
                <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
              </svg>
            </li>
            <li>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <title>Instagram</title>
                <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
              </svg>
            </li>
            <li>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <title>Dribbble</title>
                <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702-1.81-1.61-4.19-2.586-6.795-2.586-.825 0-1.63.1-2.4.285zm10.335 3.483c-.218.29-1.935 2.493-5.724 4.04.24.49.47.985.68 1.486.08.18.15.36.22.53 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.31-6.38z" />
              </svg>
            </li>
            <li>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
              >
                <title>Behance</title>
                <path d="M16.969 16.927a2.561 2.561 0 0 0 1.901.677 2.501 2.501 0 0 0 1.531-.475c.362-.235.636-.584.779-.99h2.585a5.091 5.091 0 0 1-1.9 2.896 5.292 5.292 0 0 1-3.091.88 5.839 5.839 0 0 1-2.284-.433 4.871 4.871 0 0 1-1.723-1.211 5.657 5.657 0 0 1-1.08-1.874 7.057 7.057 0 0 1-.383-2.393c-.005-.8.129-1.595.396-2.349a5.313 5.313 0 0 1 5.088-3.604 4.87 4.87 0 0 1 2.376.563c.661.362 1.231.87 1.668 1.485a6.2 6.2 0 0 1 .943 2.133c.194.821.263 1.666.205 2.508h-7.699c-.063.79.184 1.574.688 2.187ZM6.947 4.084a8.065 8.065 0 0 1 1.928.198 4.29 4.29 0 0 1 1.49.638c.418.303.748.711.958 1.182.241.579.357 1.203.341 1.83a3.506 3.506 0 0 1-.506 1.961 3.726 3.726 0 0 1-1.503 1.287 3.588 3.588 0 0 1 2.027 1.437c.464.747.697 1.615.67 2.494a4.593 4.593 0 0 1-.423 2.032 3.945 3.945 0 0 1-1.163 1.413 5.114 5.114 0 0 1-1.683.807 7.135 7.135 0 0 1-1.928.259H0V4.084h6.947Zm-.235 12.9c.308.004.616-.029.916-.099a2.18 2.18 0 0 0 .766-.332c.228-.158.411-.371.534-.619.142-.317.208-.663.191-1.009a2.08 2.08 0 0 0-.642-1.715 2.618 2.618 0 0 0-1.696-.505h-3.54v4.279h3.471Zm13.635-5.967a2.13 2.13 0 0 0-1.654-.619 2.336 2.336 0 0 0-1.163.259 2.474 2.474 0 0 0-.738.62 2.359 2.359 0 0 0-.396.792c-.074.239-.12.485-.137.734h4.769a3.239 3.239 0 0 0-.679-1.785l-.002-.001Zm-13.813-.648a2.254 2.254 0 0 0 1.423-.433c.399-.355.607-.88.56-1.413a1.916 1.916 0 0 0-.178-.891 1.298 1.298 0 0 0-.495-.533 1.851 1.851 0 0 0-.711-.274 3.966 3.966 0 0 0-.835-.073H3.241v3.631h3.293v-.014ZM21.62 5.122h-5.976v1.527h5.976V5.122Z" />
              </svg>
            </li>
          </ul>
          <div className="font-semibold text-sm hidden md:block">
            Meet Capsules®—modern and cozy <br />
            houses, in the California desert.
          </div>
        </div>
      </section>
      <hr className="my-10" />
      <section className="space-y-5">
        <div className="px-5 md:px-10 flex flex-col md:flex-row gap-y-2 gap-x-5 justify-between text-light-brown [&_span]:font-medium [&_span]:text-pale-white">
          <div>
            Website cloned by—
            <Link
              href="https://github.com/UmesiQueen"
              className="cursor-pointer underline underline-offset-2 w-full text-pale-white"
            >
              Queen
            </Link>
          </div>
          <div className="hidden md:block">
            This website is not using<span> cookies</span>
          </div>
          <div>
            All rights reserved © <span> 2026</span>
          </div>
        </div>
        <div>
          <div className="footer-capsule text-[90px] md:text-[200px] lg:text-[350px] text-center font-semibold bg-gradient-to-b from-[#9f9380] to-[#f4efe7] bg-clip-text text-transparent">
            Capsule®
          </div>
        </div>
      </section>
    </div>
  );
}
