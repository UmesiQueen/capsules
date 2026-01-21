import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "react-fast-marquee";

export default function WhySection() {
  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
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
  });

  return (
    <>
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
    </>
  );
}
