"use client";
import * as React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  return (
    <div className="p-2 font-sans">
      <section className="mb-20">
        <div className="min-h-[calc(100vh-16px)] rounded-[50px] relative overflow-hidden">
          <div className="h-full w-full bg-[url('/img/cap1.png')] bg-no-repeat bg-center bg-cover absolute top-0 left-0 scale-[1] saturate-[130%]" />
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
        <div className="text-[80px] tracking-tighter leading-20 py-40">
          <p>Welcome to a world of wild California</p>
          <p>desert with Capsules®, where you will</p>
          <p>discover exquisite nature observing it</p>
          <p>from capsule houses, nestled in the</p>
          <p>one of the most breathtaking</p>
          <p>destination on the United States.</p>
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
        <div>
          <p className="w-fit text-sm">Discover available Capsules®</p>
        </div>
      </section>
      <section className="px-7 mb-20">
        <div className="text-[184px] leading-none py-5">
          <p>Choose the one</p>
          <p>you like best</p>
        </div>
        <div className="py-10 flex *:w-full *:flex-grow ">
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
  );
}

type CapsuleProps = {
  title: string;
  description: string;
  imgSrc: string;
  features: [string, string, string, string, string, string];
  cost: number;
};

const Capsule = ({
  title,
  description,
  imgSrc,
  features,
  cost,
}: CapsuleProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [hideDialogContent, setHideDialogContent] = React.useState(false);
  const [showDialogContent, setShowDialogContent] = React.useState(false);

  return (
    <div
      style={{ backgroundImage: `url(${imgSrc})` }}
      className="h-[calc(100vh-16px)] w-full rounded-[50px] bg-no-repeat bg-center bg-cover scale-[1] overflow-hidden relative"
    >
      <video
        width="320"
        height="240"
        autoPlay
        muted
        playsInline
        loop
        className="absolute top-0 left-0 w-full h-full object-cover opacity-[0.6] mix-blend-hard-light -scale-x-100"
      >
        <source src="/img/smoke_final.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="flex flex-col *:w-full *:h-full *:flex-grow h-full w-full *:flex *:items-end">
        <div className="pl-7">
          <p className="text-[80px] leading-22">{title} Capsule®</p>
        </div>
        <div className="flex pl-4">
          <div className="flex gap-5 items-center mb-10">
            <Dialog
              onOpenChange={(event) => {
                setHideDialogContent(false);
                setShowDialogContent(false);
                if (!event) {
                  setIsDialogOpen(true);
                  setHideDialogContent(true);
                  setTimeout(() => {
                    setIsDialogOpen(false);
                  }, 1000);
                  return;
                }

                if (event) {
                  setIsDialogOpen(event);
                  setTimeout(() => {
                    setShowDialogContent(true);
                  }, 250);
                }
              }}
              open={isDialogOpen}
            >
              <DialogTrigger asChild>
                <button
                  className={cn(
                    "h-10 w-10 rounded-full bg-light-brown inline-flex items-center justify-center z-10 transition-transform duration-300 cursor-pointer",
                    isDialogOpen && "transform rotate-90"
                  )}
                >
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
                </button>
              </DialogTrigger>
              <DialogContent
                showCloseButton={false}
                className="bg-[#2a2725] border-0 rounded-[50px] font-sans p-5 w-[429px] left-7 translate-x-0 top-10 translate-y-0"
              >
                <DialogHeader>
                  <DialogTitle asChild>
                    <div
                      className={cn(
                        "flex justify-between items-center gap-3 p-3 invisible transition duration-400 ease-in-out delay-250",
                        showDialogContent && "visible",
                        hideDialogContent && "invisible"
                      )}
                    >
                      <div className="text-pale-white">
                        <h2 className="font-medium text-[38px] tracking-wide leading-10">
                          Details
                        </h2>
                        <p className="font-medium text-sm">
                          ({title} Capsule®)
                        </p>
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
                  </DialogTitle>
                  <DialogDescription asChild>
                    <div>
                      <div
                        className={cn(
                          "px-3 space-y-3 invisible transition duration-400 ease-in-out delay-250",
                          showDialogContent && "visible",
                          hideDialogContent && "invisible"
                        )}
                      >
                        <p className="text-light-brown text-sm">
                          {description}
                        </p>
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
                      <div
                        className={cn(
                          "mt-12 bg-dark-brown rounded-[50px] h-18 w-0 flex items-center transition-all duration-700 ease-in delay-450",
                          showDialogContent &&
                            "w-[calc(429px-40px)] delay-0 duration-250",
                          hideDialogContent && "w-0"
                        )}
                      >
                        <div
                          className={cn(
                            "flex justify-between items-center w-full px-5 invisible transition duration-500 ease-in-out delay-250",
                            showDialogContent && "visible",
                            hideDialogContent && "invisible"
                          )}
                        >
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
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <p className="text-sm font-semibold leading-[20px] tracking-[-.2] w-[385px]">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
