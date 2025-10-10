import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CapsuleProps {
  title: string;
  description: string;
  imgSrc: string;
  features: [string, string, string, string, string, string];
  cost: number;
}

export default function Capsule({
  title,
  description,
  imgSrc,
  features,
  cost,
}: CapsuleProps) {
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

                // onClose event
                if (!event) {
                  setIsDialogOpen(true);
                  setHideDialogContent(true);
                  setTimeout(() => {
                    setIsDialogOpen(false);
                  }, 1000);
                  return;
                }

                // onOpen event
                setIsDialogOpen(event);
                setTimeout(() => {
                  setShowDialogContent(true);
                }, 250);
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
}
