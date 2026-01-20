import * as React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { XIcon, MenuIcon } from "lucide-react";

import { menuItems } from "@/app/page";

export default function Menu() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const menuTimelineRef = React.useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollToPlugin);

    const menuRevealTl = gsap
      .timeline({ paused: true })
      .addLabel("start")
      .fromTo(".menu", { display: "none" }, { display: "block" }, "start")
      .addLabel("revealBody")
      .fromTo(
        ".menu-body",
        { height: 0, width: 0, padding: 0 },
        { height: "100%", width: "100%", padding: "8px", duration: 0.5 },
        "revealBody",
      )
      .addLabel("revealContent", ">+0.3")
      .fromTo(
        ".menu-content",
        { y: "100%", autoAlpha: 0 },
        { y: 0, autoAlpha: 1 },
        "revealContent",
      );

    // Store timeline in ref
    menuTimelineRef.current = menuRevealTl;

    // Handle menu button click
    const handleMenuBtnClick = () => {
      setMenuOpen((prev) => {
        if (prev) menuRevealTl.reverse();
        else menuRevealTl.play();

        return !prev;
      });
    };

    // Handle nav link click
    const handleNavClick = (e: Event) => {
      e.preventDefault();
      const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute(
        "href",
      );

      if (targetId) {
        // Close the menu
        setMenuOpen((prev) => {
          if (prev) menuRevealTl.reverse();
          return false;
        });

        // Scroll to target after a brief delay to allow menu to start closing
        setTimeout(() => {
          gsap.to(window, {
            duration: 3,
            scrollTo: targetId,
            ease: "power2.inOut",
          });
        }, 300);
      }
    };

    // Add event listeners
    const menuBtn = document.querySelector(".menu-btn") as HTMLElement;
    const navLinks = document.querySelectorAll(".nav-link");

    menuBtn.addEventListener("click", handleMenuBtnClick);
    navLinks.forEach((link) => {
      link.addEventListener("click", handleNavClick);
    });

    // Cleanup
    return () => {
      menuBtn.removeEventListener("click", handleMenuBtnClick);
      navLinks.forEach((link) => {
        link.removeEventListener("click", handleNavClick);
      });
    };
  });

  return (
    <>
      <div className="menu min-h-[700px] h-dvh w-full fixed z-[9997]">
        <div className="menu-body h-0 w-0 absolute bottom-0 left-1/2 right-1/2 -translate-x-1/2 backdrop-blur-md">
          <div className="h-full w-full bg-bokara-grey rounded-[50px] overflow-hidden p-3">
            <div className="menu-content h-full w-full flex flex-col md:flex-row gap-5 justify-between">
              <div className="px-3 md:px-6 py-6 flex flex-col md:justify-between gap-5 h-full">
                <ul>
                  {menuItems.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-[clamp(20px,10vw,72px)] leading-none text-light-brown hover:text-pale-white cursor-pointer transition-colors duration-100 w-fit"
                    >
                      <a href={`#${item.slug}`} className="nav-link">
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col-reverse md:flex-row gap-y-5 gap-x-10 md:items-center">
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
                  <div className="font-semibold text-sm text-light-brown">
                    This website is just a concept work done by—Moyra{" "}
                    <br className="hidden md:block" /> and cloned by Queen to
                    showcase our capabilities.
                  </div>
                </div>
              </div>
              <div className="bg-[url('/img/cap2.png')] bg-center bg-cover h-1/3 md:h-full w-full md:w-1/3 rounded-[50px] inline-flex items-center">
                <Marquee autoFill={true} speed={50}>
                  <Image
                    src={"/img/capsule.svg"}
                    alt="Capsules Logo"
                    width={500}
                    height={500}
                    className="h-20 md:h-40 w-fit"
                  />
                </Marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="menu-btn fixed bottom-7 left-1/2 right-1/2 -translate-x-1/2 w-30 h-12 p-1 bg-pale-white text-black rounded-[50px] z-[9998] flex justify-end gap-4 items-center hover:cursor-pointer">
        <div className="group relative overflow-hidden">
          <p className="text-sm group-hover:-translate-y-full transition-transform duration-200">
            {menuOpen ? "Close" : "Menu"}
          </p>
          <p className="text-sm z-0 absolute top-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-200 delay-10 h-full">
            {menuOpen ? "Close" : "Menu"}
          </p>
        </div>
        <div className="h-full w-10 bg-bokara-grey rounded-full inline-flex items-center justify-center text-pale-white">
          {menuOpen ? <XIcon /> : <MenuIcon />}
        </div>
      </button>
    </>
  );
}
