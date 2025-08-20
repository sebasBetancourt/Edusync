// src/components/FlipPinnedOverlay.jsx
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * Desktop:
 *  - Pinned 100vh, flip 180° por tarjeta (Home(text)↔About(media), Home(media)↔About(text)).
 *  - Título de AboutUs baja desde ARRIBA a su posición ORIGINAL.
 *  - "Empuje" automático: con poco scroll cruza umbral y empujamos el scroll
 *    al inicio/fin para NO quedarse con tarjetas a mitad de giro.
 *
 * Mobile (<=1023px):
 *  - Sin efecto: render normal (Home y AboutUs en flujo).
 */
export function FlipPinnedOverlay({
  children,
  headerOffsetPx = 0,

  // Suavidad / duración de flip
  flipEase = "expo.inOut",
  scrub = 0.35,          // menor = más “jale”; 0.3–0.5 recomendado

  // Tramo del pin donde ocurre el flip (0..1)
  winStart = 0.08,
  winEnd = 0.92,

  // Empuje automático (para no ver mitad del giro)
  forwardTrigger = 0.20,     // si progress sube por encima => empuja al final
  backwardTrigger = 0.80,    // si progress baja por debajo => empuja al inicio
  autoScrollDuration = 0,  // duración del empuje (seg)
}) {
  const rootRef = useRef(null);
  const homeLayerRef = useRef(null);
  const aboutLayerRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [homeChild, aboutChild] = React.Children.toArray(children);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (isMobile) return; // en mobile no montamos el efecto

    const root = rootRef.current;
    const homeLayer = homeLayerRef.current;
    const aboutLayer = aboutLayerRef.current;
    if (!root || !homeLayer || !aboutLayer) return;

    // Nodos por data-atributos (NO tocamos tu layout)
    const homeText  = homeLayer.querySelector('[data-card="home-text"]');
    const homeMedia = homeLayer.querySelector('[data-card="home-media"]');
    const aboutText = aboutLayer.querySelector('[data-card="about-text"]');
    const aboutMed  = aboutLayer.querySelector('[data-card="about-media"]');
    const aboutTitle = aboutLayer.querySelector('[data-title="about"]');

    if (!homeText || !homeMedia || !aboutText || !aboutMed || !aboutTitle) {
      console.warn("FlipPinnedOverlay: faltan data-* en Home o AboutUs.");
      return;
    }

    const all = [homeText, homeMedia, aboutText, aboutMed, aboutTitle];

    // Preparación 3D y suavidad
    gsap.set([homeLayer, aboutLayer], { perspective: 1200 });
    gsap.set(all, {
      transformPerspective: 1200,
      transformStyle: "preserve-3d",
      backfaceVisibility: "hidden",
      transformOrigin: "50% 50%",
      willChange: "transform, opacity",
      force3D: true,
    });
    // iframes: evitar parpadeos al rotar
    [...homeLayer.querySelectorAll("iframe"), ...aboutLayer.querySelectorAll("iframe")].forEach(el =>
      gsap.set(el, { backfaceVisibility: "hidden", transform: "translateZ(0.001px)" })
    );

    // Estado inicial
    gsap.set([homeText, homeMedia], { rotateY: 0, opacity: 1 });
    gsap.set([aboutText, aboutMed], { rotateY: -180, opacity: 0 });
    gsap.set(aboutTitle, { y: -24, opacity: 0 });
    gsap.set(homeLayer,  { opacity: 1, pointerEvents: "auto" });
    gsap.set(aboutLayer, { opacity: 0, pointerEvents: "none" });

    const ease = gsap.parseEase(flipEase);
    const clamp01 = gsap.utils.clamp(0, 1);

    // Estado de empuje para no re-disparar en bucle
    let currentSection = "home"; // "home" | "about"
    let isAutoScrolling = false;

    const st = ScrollTrigger.create({
      trigger: root,
      start: headerOffsetPx ? `${headerOffsetPx}px top` : "top top",
      end: "+=100%", // 100vh
      scrub,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,

      onUpdate: (self) => {
        const p = self.progress; // 0..1
        const dir = self.direction; // 1 bajando, -1 subiendo

        // -------- Flip “normal” pero encuadrado a ventana central --------
        const t = clamp01((p - winStart) / (winEnd - winStart));
        const s = ease(t);
        const inv = 1 - s;

        // Tarjetas cruzadas
        gsap.set(homeText,  { rotateY: 180 * s,   opacity: 1 - s });
        gsap.set(aboutMed,  { rotateY: -180 * inv, opacity: s });

        gsap.set(homeMedia, { rotateY: 180 * s,   opacity: 1 - s });
        gsap.set(aboutText, { rotateY: -180 * inv, opacity: s });

        // Título baja desde ARRIBA
        gsap.set(aboutTitle, { y: -24 * inv, opacity: s });

        // Fundido de capas (Home→About)
        gsap.set(aboutLayer, { opacity: s });
        gsap.set(homeLayer,  { opacity: 1 - s });

        // Normaliza extremos (recargas)
        if (p <= 0.001) {
          currentSection = "home";
          gsap.set([homeText, homeMedia], { rotateY: 0, opacity: 1 });
          gsap.set([aboutText, aboutMed], { rotateY: -180, opacity: 0 });
          gsap.set(aboutTitle, { y: -24, opacity: 0 });
          gsap.set(homeLayer,  { opacity: 1, pointerEvents: "auto" });
          gsap.set(aboutLayer, { opacity: 0, pointerEvents: "none" });
        } else if (p >= 0.999) {
          currentSection = "about";
          gsap.set([aboutText, aboutMed], { rotateY: 0, opacity: 1 });
          gsap.set([homeText, homeMedia], { rotateY: 180, opacity: 0 });
          gsap.set(aboutTitle, { y: 0, opacity: 1 });
          gsap.set(homeLayer,  { opacity: 0, pointerEvents: "none" });
          gsap.set(aboutLayer, { opacity: 1, pointerEvents: "auto" });
        }

        // -------- Empuje automático (NO ver mitad de giro) --------
        // Si ya estamos empujando, no re-evaluar hasta terminar.
        if (isAutoScrolling) return;

        // Bajando: si cruzamos forwardTrigger y estamos en "home" → empuja hasta el final del pin
        if (dir === 1 && currentSection === "home" && p >= forwardTrigger) {
          isAutoScrolling = true;
          currentSection = "about";
          gsap.to(window, {
            duration: autoScrollDuration,
            ease: "power2.out",
            scrollTo: self.end, // empuja al final del pin
            onComplete: () => { isAutoScrolling = false; }
          });
        }

        // Subiendo: si cruzamos backwardTrigger y estamos en "about" → empuja al inicio del pin
        if (dir === -1 && currentSection === "about" && p <= backwardTrigger) {
          isAutoScrolling = true;
          currentSection = "home";
          gsap.to(window, {
            duration: autoScrollDuration,
            ease: "power2.out",
            scrollTo: self.start, // empuja al inicio del pin
            onComplete: () => { isAutoScrolling = false; }
          });
        }
      },
    });

    return () => {
      st.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile, headerOffsetPx, flipEase, scrub, winStart, winEnd, forwardTrigger, backwardTrigger, autoScrollDuration]);

  // MOBILE: render normal (sin overlay ni pin)
  if (isMobile) {
    return (
      <section id="flip-overlay" className="bg-white">
        {homeChild}
        {aboutChild}
      </section>
    );
  }

  // DESKTOP: overlay con efecto y empuje
  return (
    <section
      id="flip-overlay"
      ref={rootRef}
      className="relative h-screen overflow-hidden bg-white"
    >
      {/* Capa HOME (tu componente tal cual) */}
      <div ref={homeLayerRef} className="absolute inset-0 z-10 will-change-transform">
        {homeChild}
      </div>

      {/* Capa ABOUT (tu componente tal cual) */}
      <div ref={aboutLayerRef} className="absolute inset-0 z-20 will-change-transform">
        {aboutChild}
      </div>
    </section>
  );
}
