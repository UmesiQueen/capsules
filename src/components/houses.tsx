import * as React from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import Marquee from "react-fast-marquee";

export default function Houses() {
  const housesRef = React.useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger, SplitText);

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
    },
    { scope: housesRef },
  );

  return (
    <div ref={housesRef}>
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
    </div>
  );
}

interface CapsuleProps {
  title: string;
  description: string;
  imgSrc: string;
  features: [string, string, string, string, string, string];
  cost: number;
  style?: string;
}

function Capsule({ title, description, imgSrc, features, cost }: CapsuleProps) {
  const [showDialog, setShowDialog] = React.useState(false);
  const capsuleRef = React.useRef<HTMLDivElement | null>(null);
  const tlRef = React.useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const container = capsuleRef.current;
      if (!container) return;

      const dialogBtn = container.querySelector(".dialog-btn");
      const dialogContent = container.querySelectorAll(".dialog-content");
      const dialog = container.querySelector(".dialog");
      const costDetails = container.querySelector(".cost-details");
      gsap.set(dialog, { display: "none" });

      tlRef.current = gsap
        .timeline({
          paused: true,
          onStart: () => {
            if (dialog) {
              gsap.set(dialog, { display: "block" });
              setShowDialog(true);
            }
          },
          onReverseComplete: () => {
            if (dialog) {
              gsap.set(dialog, { display: "none" });
              setShowDialog(false);
            }
          },
        })
        .add("start")
        .fromTo(
          dialogBtn,
          {
            backgroundColor: "#b1a696",
            rotate: 0,
          },
          {
            backgroundColor: "#d9d6d2",
            rotate: 135,
            duration: 0.5,
          },
          "start",
        )
        .fromTo(
          dialog,
          { height: 0, width: 0, padding: 0 },
          {
            height: "620px",
            width: "429px",
            padding: "20px",
            duration: 0.5,
          },
          "start+=0.2",
        )
        .add("revealCost")
        .fromTo(
          costDetails,
          { width: 0 },
          { width: "100%", duration: 0.5 },
          "revealCost+=0.1",
        )
        .add("revealText")
        .fromTo(
          dialogContent,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "revealText+=0.1",
        );

      const toggleDialog = () => {
        if (!tlRef.current) return;
        if (tlRef.current.progress() === 1) {
          tlRef.current.reverse();
        } else {
          tlRef.current.play();
        }
      };

      if (!dialogBtn) return;
      dialogBtn.addEventListener("click", toggleDialog);

      return () => {
        dialogBtn.removeEventListener("click", toggleDialog);
      };
    },
    { scope: capsuleRef },
  );

  React.useEffect(() => {
    if (!showDialog) return;

    const handleClickOutside = (event: MouseEvent) => {
      const dialog = capsuleRef.current?.querySelector(".dialog");
      const dialogBtnRef = capsuleRef.current?.querySelector(".dialog-btn");
      const clickedInsideDialog = dialog?.contains(event.target as Node);
      const clickedButton = dialogBtnRef?.contains(event.target as Node);

      if (!clickedInsideDialog && !clickedButton) {
        tlRef.current?.reverse();
        setShowDialog(false);
      }
    };

    const handleScroll = (event: Event) => {
      const dialog = capsuleRef.current?.querySelector(".dialog");
      const scrolledInsideDialog = dialog?.contains(event.target as Node);

      // Close dialog if scroll happens outside of it
      if (!scrolledInsideDialog) {
        tlRef.current?.reverse();
        setShowDialog(false);
      }
    };

    // Add small delay to avoid immediate triggering
    const timeoutId = setTimeout(() => {
      window.addEventListener("click", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true); // Use capture phase
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [showDialog]);

  return (
    <div
      ref={capsuleRef}
      className="capsule-card relative overflow-hidden rounded-[50px] h-full w-full"
    >
      <div
        style={{ backgroundImage: `url(${imgSrc})` }}
        className="card-img h-full w-full bg-no-repeat bg-center bg-cover absolute top-0 left-0 z-0"
      />
      <video
        width="320"
        height="240"
        autoPlay
        muted
        playsInline
        loop
        className="card-smoke absolute top-0 left-0 w-full h-full object-cover mix-blend-hard-light -scale-x-100 z-1 opacity-[0.5]"
      >
        <source src="/img/smoke_final.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex flex-col *:w-full *:h-full *:flex-grow h-full w-full *:flex *:items-end absolute z-3">
        <div className="pl-3 md:pl-7">
          <p className="card-title text-[clamp(20px,10vw,80px)] leading-22">
            {title} Capsule®
          </p>
        </div>
        <div>
          <div className="flex flex-col md:flex-row gap-5 md:items-center md:mb-10 md:ml-4 px-3 pb-10 md:p-0">
            <div className="h-10 w-10 inline-flex justify-center items-center relative">
              <button className="dialog-btn group relative h-10 w-10 overflow-hidden bg-light-brown rounded-full inline-flex items-center justify-center cursor-pointer">
                <div className="absolute inset-0 bg-[#c3baad] transition-all duration-700 ease-in-out [clip-path:circle(0%_at_50%_50%)] group-hover:[clip-path:circle(150%_at_50%_50%)]" />
                <span className="relative z-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[15px]"
                  >
                    <rect
                      width="22"
                      height="2"
                      transform="matrix(-1 8.42937e-08 8.42937e-08 1 23 11)"
                      fill="rgba(42, 39, 37, 1)"
                    ></rect>
                    <rect
                      width="22"
                      height="2"
                      transform="translate(12.999 0.999512) rotate(90)"
                      fill="rgba(42, 39, 37, 1)"
                    ></rect>
                  </svg>
                </span>
              </button>
              <div className="dialog bg-bokara-grey rounded-[50px] font-sans absolute bottom-12 left-0">
                <div className="dialog-content flex justify-between items-center gap-3 p-3">
                  <div className="text-pale-white">
                    <h2 className="font-medium text-[38px] tracking-wide leading-10">
                      Details
                    </h2>
                    <p className="font-medium text-sm">({title} Capsule®)</p>
                  </div>
                  <div>
                    <Image
                      src={imgSrc}
                      alt="Capsules"
                      width={500}
                      height={500}
                      className="h-15 w-fit rounded-2xl"
                    />
                  </div>
                </div>
                <div>
                  <div className="dialog-content px-3 space-y-3">
                    <p className="text-light-brown text-sm">{description}</p>
                    <table className="w-full">
                      <tbody className="[&>tr:not(:last-child)]:border-b [&>tr:not(:last-child)]:border-b-light-brown/40 [&>tr>td:last-child]:text-right [&>tr>td]:py-2.5 text-pale-white">
                        <tr>
                          <td>Square footage</td>
                          <td>{features[0]}</td>
                        </tr>
                        <tr>
                          <td>Bed</td>
                          <td>{features[1]}</td>
                        </tr>
                        <tr>
                          <td>Shifting Window</td>
                          <td>{features[2]}</td>
                        </tr>
                        <tr>
                          <td>Air Condition</td>
                          <td>{features[3]}</td>
                        </tr>
                        <tr>
                          <td>Jacuzzi</td>
                          <td>{features[4]}</td>
                        </tr>
                        <tr>
                          <td>Terrace</td>
                          <td>{features[5]}</td>
                        </tr>
                      </tbody>
                    </table>
                    <button className="p-0 rounded-none h-fit underline text-pale-white">
                      Ready to reserve?
                    </button>
                  </div>
                  <div className="cost-details mt-12 bg-dark-brown h-18 rounded-[50px] flex items-center">
                    <div className="dialog-content flex justify-between items-center w-full px-5">
                      <p className="text-light-brown">Cost</p>
                      <p className="text-pale-white font-semibold">
                        {cost} USD{" "}
                        <span className="text-light-brown font-normal">
                          / Night
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="card-description text-sm font-semibold leading-[20px] tracking-[-.2] w-full md:w-[385px]">
              {description}
            </p>
          </div>
        </div>
        <div className="overlay absolute h-full w-full bg-black/80 z-5 invisible" />
      </div>
    </div>
  );
}
