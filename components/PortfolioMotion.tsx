"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PortfolioMotion() {
  useGSAP(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const hero = document.querySelector<HTMLElement>(".hero");
    const orb = document.querySelector<HTMLElement>(".hero-orb");

    if (!hero || !orb) return;

    /*
     * --------------------------------------------------
     * HERO INTRO
     * --------------------------------------------------
     */

    if (!reduceMotion) {
      gsap.fromTo(
        ".hero-reveal",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "power4.out",
        }
      );
    }

    /*
     * --------------------------------------------------
     * SECTION REVEALS
     * --------------------------------------------------
     */

    if (!reduceMotion) {
      gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .forEach((element) => {
          gsap.fromTo(
            element,
            {
              y: 60,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 88%",
                once: true,
              },
            }
          );
        });
    }

    /*
     * --------------------------------------------------
     * REDUCED MOTION
     * --------------------------------------------------
     */

    if (reduceMotion) {
      gsap.set(orb, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
      });

      return;
    }

    /*
     * --------------------------------------------------
     * ORB COLORS
     * --------------------------------------------------
     */

    const orbThemes = [
      {
        selector: ".hero",
        core: "#d7ff43",
        glow: "rgba(215,255,67,0.24)",
      },
      {
        selector: ".intro",
        core: "#11110f",
        glow: "rgba(17,17,15,0.20)",
      },
      {
        selector: ".work",
        core: "#d7ff43",
        glow: "rgba(215,255,67,0.24)",
      },
      {
        selector: ".projects",
        core: "#b9a7ff",
        glow: "rgba(185,167,255,0.24)",
      },
      {
        selector: ".research",
        core: "#11110f",
        glow: "rgba(17,17,15,0.20)",
      },
      {
        selector: ".github",
        core: "#d7ff43",
        glow: "rgba(215,255,67,0.24)",
      },
      {
        selector: ".writing",
        core: "#ffae63",
        glow: "rgba(255,174,99,0.24)",
      },
      {
        selector: ".contact",
        core: "#11110f",
        glow: "rgba(17,17,15,0.20)",
      },
    ];

    /*
     * --------------------------------------------------
     * INITIAL ORB COLOR
     * --------------------------------------------------
     */

    gsap.set(orb, {
      "--orb-core": "#d7ff43",
      "--orb-glow": "rgba(215,255,67,0.24)",
      "--orb-opacity": 0.9,
    });

    /*
     * --------------------------------------------------
     * SECTION COLOR TRANSITIONS
     * --------------------------------------------------
     */

    orbThemes.forEach((theme) => {
      const section = document.querySelector<HTMLElement>(
        theme.selector
      );

      if (!section) return;

      ScrollTrigger.create({
        trigger: section,
        start: "top 60%",
        end: "bottom 40%",

        onEnter: () => {
          gsap.to(orb, {
            "--orb-core": theme.core,
            "--orb-glow": theme.glow,
            duration: 0.7,
            ease: "power2.out",
          });
        },

        onEnterBack: () => {
          gsap.to(orb, {
            "--orb-core": theme.core,
            "--orb-glow": theme.glow,
            duration: 0.7,
            ease: "power2.out",
          });
        },
      });
    });

    /*
     * --------------------------------------------------
     * SPIRAL MOTION
     * --------------------------------------------------
     *
     * The orb normally follows a spiral.
     *
     * However, during the HERO → ABOUT transition,
     * we deliberately bias the X position toward the
     * LEFT side of the screen.
     */

    ScrollTrigger.create({
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      scrub: 1.2,

      onUpdate: (self) => {
        const p = self.progress;

        /*
         * Number of rotations across the page.
         */
        const angle = p * Math.PI * 10;

        /*
         * Normal spiral radius.
         */
        const radiusX =
          120 + Math.sin(p * Math.PI) * 180;

        const radiusY =
          80 + Math.sin(p * Math.PI) * 120;

        /*
         * Normal spiral position.
         */
        let x = Math.cos(angle) * radiusX;
        let y = Math.sin(angle) * radiusY;

        /*
         * --------------------------------------------------
         * HERO → ABOUT LEFTWARD MOVEMENT
         * --------------------------------------------------
         *
         * The hero is approximately the first 1/8 of the
         * page. The About section follows immediately after.
         *
         * We create a transition window around the beginning
         * of the About section.
         */

        const intro = document.querySelector<HTMLElement>(".intro");

        if (intro) {
          const introTop = intro.offsetTop;
          const introHeight = intro.offsetHeight;

          const scrollY = window.scrollY;

          /*
           * Start slightly before About begins.
           */
          const transitionStart = introTop - window.innerHeight * 0.75;

          /*
           * Finish once we're comfortably inside About.
           */
          const transitionEnd =
            introTop + introHeight * 0.35;

          /*
           * Convert current scroll position into 0 → 1.
           */
          const introProgress = gsap.utils.clamp(
            0,
            1,
            (scrollY - transitionStart) /
              (transitionEnd - transitionStart)
          );

          /*
           * Smooth easing for the leftward movement.
           */
          const easedIntroProgress =
            gsap.parseEase("power2.inOut")(introProgress);

          /*
           * During the transition:
           *
           * right side → left side
           *
           * 180px → -300px
           */
          const heroToAboutX = gsap.utils.interpolate(
            180,
            -300,
            easedIntroProgress
          );

          /*
           * Give the orb a slight downward/upward arc
           * instead of making the movement completely linear.
           */
          const heroToAboutY =
            Math.sin(introProgress * Math.PI) * 100;

          /*
           * Blend the deliberate transition with the
           * existing spiral.
           */
          const transitionStrength =
            Math.sin(introProgress * Math.PI);

          x = gsap.utils.interpolate(
            x,
            heroToAboutX,
            transitionStrength
          );

          y += heroToAboutY * transitionStrength;
        }

        /*
         * --------------------------------------------------
         * SCALE
         * --------------------------------------------------
         */

        const scale =
          0.78 +
          Math.sin(p * Math.PI) * 0.35;

        /*
         * --------------------------------------------------
         * ROTATION
         * --------------------------------------------------
         */

        const rotation = p * 900;

        gsap.set(orb, {
          x,
          y,
          scale,
          rotation,
        });
      },
    });

    /*
     * --------------------------------------------------
     * SUBTLE BREATHING
     * --------------------------------------------------
     */

    gsap.to(orb, {
      "--orb-opacity": 0.72,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    /*
     * --------------------------------------------------
     * REFRESH SCROLLTRIGGER
     * --------------------------------------------------
     */

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });

  return null;
}