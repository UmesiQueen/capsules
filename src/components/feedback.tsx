import React from "react";
import { Button } from "./ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

export default function Feedback() {
  const feedbackRef = React.useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

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
    },
    { scope: feedbackRef },
  );

  return (
    <div ref={feedbackRef}>
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
    </div>
  );
}
