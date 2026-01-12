"use client";
import * as React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Capsule from "@/components/CapsuleCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollSmoother, ScrollTrigger, SplitText } from "gsap/all";
import TextRevealAnimation from "@/components/TextRevealAnimation";
import { Button } from "@/components/ui/button";

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
        .addLabel("fadeIn")
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
        "contentReveal"
      )
      .addLabel("card1OnLeave")
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
      .addLabel("card2OnEnter", "<")
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
        "card2ContentReveal"
      )
      .addLabel("card2OnLeave")
      .to(".capsule-container .card2", { scale: 0.9 }, "card2OnLeave")
      .fromTo(
        ".capsule-container .card2 .overlay",
        { autoAlpha: 0 },
        { autoAlpha: 1 },
        "card2OnLeave"
      )
      .addLabel("card3OnEnter", "<")
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
        "card3ContentReveal"
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
        "secondCarouselTl"
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
        "thirdCarouselTl"
      );

    const secondCarouselTl = gsap
      .timeline({ paused: true })
      .addLabel("carousel1OnLeave")
      .fromTo(
        ".capsule-carousel .item-1",
        { scale: 1, autoAlpha: 1 },
        { scale: 0.8, autoAlpha: 0 },
        "carousel1OnLeave"
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
        "carousel1OnLeave"
      )
      .addLabel("carousel2OnEnter", "<")
      .fromTo(
        ".capsule-carousel .item-2 .bg-1",
        { clipPath: "inset(0% 0 0% 0)" },
        { clipPath: "inset(100% 0 0% 0)" },
        "carousel2OnEnter"
      )
      .fromTo(
        ".capsule-carousel .item-3",
        { y: "0%", x: "100%" },
        { y: "-100%", x: "100%" },
        "carousel2OnEnter"
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
        "carousel2OnLeave"
      )
      .addLabel("carousel3OnEnter", "<")
      .fromTo(
        ".capsule-carousel .item-3",
        { x: "100%" },
        { x: "0%" },
        "carousel3OnEnter"
      )
      .fromTo(
        ".capsule-carousel .item-3 .txt-1",
        { clipPath: "inset(0% 0 0% 0)" },
        { clipPath: "inset(100% 0 0% 0)", duration: 0.5 },
        "carousel3OnEnter"
      )
      .fromTo(
        ".capsule-carousel .item-3 .txt-2",
        { y: "100%", clipPath: "inset(100% 0 0% 0)" },
        { y: "0%", clipPath: "inset(0% 0 0% 0)", duration: 0.5 },
        "carousel3OnEnter"
      )
      .fromTo(
        ".capsule-carousel .item-4",
        { y: "0%" },
        { y: "-100%" },
        "carousel3OnEnter"
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
      ".activity-container"
    ) as HTMLElement;
    if (!activityContainer) return;
    const childActivityElements = Array.from(
      activityContainer.children
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
        "start"
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
        "Enter2Review"
      )
      .addLabel("review2") // Second review position
      .addLabel("Exit2Review")
      .to(secondReview, { y: "-120%", duration: 0.35 }, "Exit2Review")
      .addLabel("Enter3Review", ">")
      .fromTo(
        thirdReview,
        { y: "-120%" },
        { y: "0%", duration: 0.35 },
        "Enter3Review"
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
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <div className="font-sans from-[#181717] to-[#22201f] bg-gradient-to-b">
          <section className="p-2 mb-20">
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
          <section className="px-10 mb-50">
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
            <div className="flex items-center justify-between *:w-full *:flex-grow">
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
            <div className="choose-container">
              <p className="choose-sub text-sm pb-8">
                Discover available Capsules®
              </p>
              <div className="text-[184px] text-nowrap leading-tight">
                <div className="choose-text">Choose the one</div>
                <div className="choose-text -mt-10">you like best</div>
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
          <section className="p-2">
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
              <div className="scroll-indicator absolute top-1/2 bottom-1/2 -translate-y-1/2 right-5 z-10">
                <p className="text-[40px] text-white/50">(Scroll)</p>
              </div>
              <div className="scroll-indicator absolute bottom-15 right-5 w-80 h-[2px] rounded-md bg-white/30 z-10 inline-flex overflow-hidden">
                <div className="capsule-progress w-0 h-full bg-white" />
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center justify-center text-center h-dvh">
            <div className="mb-10 text-[15px] text-light-brown tracking-[-0.2] leading-[23px] font-semibold">
              Closer than you think
            </div>
            <div className="text-[90px] tracking-[-4px] leading-[96px]">
              Our Capsules® are located <br />
              near Los Angeles with easy <br />
              <span className="underline text-light-brown underline-offset-[10px] decoration-from-font decoration-solid cursor-pointer">
                access by road.
              </span>
            </div>
          </section>
          <section>
            <div className="ml-5 text-[15px] text-white tracking-[-0.2] leading-[23px] font-semibold">
              Want to learn more about <br />
              the benefits of—Capsules®?
            </div>
            <div className="py-10">
              <Marquee autoFill={true} speed={150}>
                <div className="text-[200px] leading-none overflow-hidden">
                  Why Capsule®?*
                </div>
              </Marquee>
            </div>
            <div className="capsule-carousel p-2 h-dvh">
              <div className="overflow-hidden flex *:flex-grow flex-wrap w-full h-full *:h-full *:w-[calc(50vw-20px)] *:overflow-hidden *:rounded-[50px] *:relative">
                <div className="item-1 bg-bokara-grey">
                  <div className="flex flex-col justify-between h-full w-full py-10 px-6">
                    <div className="text-light-brown text-[38px] tracking-wide leading-10 font-semibold w-fit">
                      <p>Enjoy the view</p>
                      <p>through —the wide</p>
                      <p>panoramic glass</p>
                      <p>window</p>
                    </div>
                    <div className="flex items-center gap-5 justify-between w-full">
                      <div className="flex gap-x-[4px]">
                        <div className="rounded-full border-2 w-10 h-10 inline-flex justify-center items-center text-sm font-semibold">
                          <span>01</span>
                        </div>
                        <div className="rounded-full border-2 border-white/50 text-white/50 w-10 h-10 inline-flex justify-center items-center text-sm font-semibold">
                          <span>03</span>
                        </div>
                      </div>
                      <div>
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
                  <div className="flex flex-col justify-between h-full w-full py-10 px-6">
                    <div className="text-light-brown text-[38px] tracking-wide leading-10 font-semibold">
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
                    <div className="flex items-center gap-5 justify-between w-full">
                      <div className="flex gap-x-[4px]">
                        <div className="rounded-full border-2 w-10 h-10 inline-flex justify-center items-center text-sm font-semibold overflow-hidden">
                          <div className="relative h-5 w-5 *:absolute *:top-0 *:left-0 *:w-full">
                            <span className=" txt-1">02</span>
                            <span className="txt-2">03</span>
                          </div>
                        </div>
                        <div className="rounded-full border-2 border-white/50 text-white/50 w-10 h-10 inline-flex justify-center items-center text-sm font-semibold">
                          <span>03</span>
                        </div>
                      </div>
                      <div className="w-100">
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
          </section>
          <section className="mt-40 px-5">
            <div className="discover-container">
              <p className="discover-sub text-sm pb-8">
                Ready for an adventure?
              </p>
              <div className="text-[184px] text-nowrap leading-tight">
                <div className="discover-text">Discover the</div>
                <div className="discover-text -mt-15">desert activities</div>
              </div>
            </div>
            <div className="flex gap-35 w-full *:w-full *:flex-1 mt-10">
              <div className="space-y-6">
                <p className="font-semibold tracking-wider text-sm leading-none">
                  Offered Capsules® activity have different levels of
                  difficulty:
                </p>
                <ul className="discover-levels space-y-4">
                  <li className="space-y-4">
                    <div className="flex gap-x-2 justify-between items-start text-light-brown">
                      <p className="text-[27px] font-medium">Easy</p>
                      <p>3-5h duration</p>
                    </div>
                    <div className="bg-pale-white/40 relative overflow-hidden h-[2px] w-full">
                      <div className="level-1 absolute top-0 left-0 h-full bg-pale-white" />{" "}
                    </div>
                  </li>
                  <li className="space-y-4">
                    <div className="flex gap-x-2 justify-between items-start text-light-brown">
                      <p className="text-[27px] font-medium">Medium</p>
                      <p>8-12h duration</p>
                    </div>
                    <div className="bg-pale-white/40 relative overflow-hidden h-[2px] w-full">
                      <div className="level-2 absolute top-0 left-0 h-full bg-pale-white" />
                    </div>
                  </li>
                  <li className="space-y-4">
                    <div className="flex gap-x-2 justify-between items-start text-light-brown">
                      <p className="text-[27px] font-medium">Hard</p>
                      <p>24h duration</p>
                    </div>
                    <div className="bg-pale-white/40 relative overflow-hidden h-[2px] w-full">
                      <div className="level-3 absolute top-0 left-0 h-full bg-pale-white" />
                    </div>
                  </li>
                </ul>
              </div>
              <div className="text-[38px] font-medium tracking-tight leading-10 text-light-brown text-nowrap">
                We want to make sure your stay is <br />
                exciting and enjoyable. That’s why we <br />
                offer a variety of activities with different <br />
                levels of engagement. Whether you seek <br />
                thrills or tranquility, there’s something for <br />
                everyone to make your desert stay truly <br />
                memorable.
              </div>
            </div>
          </section>
          <section className="mt-50 pb-50">
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
                  <div className="absolute top-0 left-0 w-full h-full z-1 flex flex-col justify-between px-6 py-10  text-white">
                    <div className="flex justify-between items-start">
                      <h3 className="text-4xl font-semibold">
                        Buggy tours <br /> in the desert
                      </h3>
                      <div className="rounded-full py-1 px-2 border-2 font-semibold text-sm">
                        Easy
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold">
                        Explore the terrain on a guided buggy tour that takes
                        <br />
                        you through the deserts vast&apos;s and open landscapes.
                      </p>
                      <div className="flex gap-x-[4px]">
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
                      className="object-fit object-top scale-[1.2] w-full h-full"
                    />
                  </div>
                  <div className=" absolute top-0 left-0 w-full h-full z-1 flex flex-col justify-between px-6 py-10  text-white">
                    <div className="flex justify-between items-start">
                      <h3 className="text-4xl font-semibold">
                        Breathtaking <br /> desert hikes
                      </h3>
                      <div className="rounded-full py-1 px-2 border-2 font-semibold text-sm">
                        Medium
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold">
                        Set out on a hike that offers clear trails, stunning
                        views, <br />
                        and a closer look at the unique desert environment.
                      </p>
                      <div className="flex gap-x-[4px]">
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
                      className="object-cover object-center scale-[1.2] w-full h-full"
                    />
                  </div>
                  <div className=" absolute top-0 left-0 w-full h-full z-1 flex flex-col justify-between px-6 py-10  text-white">
                    <div className="flex justify-between items-start">
                      <h3 className="text-4xl font-semibold">
                        Exciting group <br /> rock climbing
                      </h3>
                      <div className="rounded-full py-1 px-2 border-2 font-semibold text-sm">
                        Hard
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-semibold">
                        Climbing session on natural sandstone formations,
                        designed
                        <br />
                        to be both challenging and safe while fostering
                        teamwork.
                      </p>
                      <div className="flex gap-x-[4px]">
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
          <section className="reviews py-5 px-10 ">
            <p className="text-xs pb-8 font-semibold">Do people like us?</p>
            <div className="relative min-h-[520px]">
              <div>
                <div className="space-y-5">
                  <div className="text-[80px] tracking-tighter leading-[1]">
                    {/* line 1 */}
                    <div className="h-24 overflow-hidden relative *:absolute *:top-0 *:left-0">
                      <div className="review-1">Staying at Capsule® in the</div>
                      <div className="review-2">
                        Capsule® offered the perfect
                      </div>
                      <div className="review-3">Capsule® was the perfect</div>
                    </div>
                    {/* line 2 */}
                    <div className="h-24 overflow-hidden relative *:absolute *:top-0 *:left-0">
                      <div className="review-1">
                        California desert redefined my
                      </div>
                      <div className="review-2">
                        escape — sleek, modern spaces
                      </div>
                      <div className="review-3">desert hideaway — stylish,</div>
                    </div>
                    {/* line 3 */}
                    <div className="h-24 overflow-hidden relative *:absolute *:top-0 *:left-0">
                      <div className="review-1">
                        retreat — modern design meets
                      </div>
                      <div className="review-2">
                        surrounded by desert stillness.
                      </div>
                      <div className="review-3">
                        peaceful, and fully surrounded
                      </div>
                    </div>
                    {/* line 4 */}
                    <div className="h-24 overflow-hidden relative *:absolute *:top-0 *:left-0">
                      <div className="review-1">
                        nature, and every sunset feels
                      </div>
                      <div className="review-2">Each moment felt peaceful,</div>
                      <div className="review-3">by stunning views day and</div>
                    </div>
                    {/* line 5 */}
                    <div className="h-24 overflow-hidden relative *:absolute *:top-0 *:left-0">
                      <div className="review-1">like a serene masterpiece.</div>
                      <div className="review-2">
                        grounded, and truly unique.
                      </div>
                      <div className="review-3">night.</div>
                    </div>
                  </div>
                  <div className="h-24 overflow-hidden relative *:absolute *:top-0 *:left-0">
                    {/* review 1 profile */}
                    <div className="review-1 flex gap-5 items-center">
                      <div className="w-15 bg-pink-700 aspect-square rounded-full" />
                      <div>
                        Queen Umesi <br /> (Lagos, Nigeria)
                      </div>
                    </div>
                    {/* review 2 profile */}
                    <div className="review-2 flex gap-5 items-center">
                      <div className="w-15 bg-red-500 aspect-square rounded-full" />
                      <div>
                        Marcus Simpson <br /> (New York)
                      </div>
                    </div>
                    {/* review 3 profile */}
                    <div className="review-3 flex gap-5 items-center">
                      <div className="w-15 aspect-square bg-amber-500 rounded-full" />
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
          <div className="h-dvh w-full" />
        </div>
      </div>
    </div>
  );
}
