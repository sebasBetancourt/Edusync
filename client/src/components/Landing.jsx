import Header from "./Header.jsx";
import Home from "./Home.jsx";
import AboutUs from "./AboutUs.jsx";
import UpdateWithoutDev from "./UpdateWithoutDev.jsx";
import HowItWorks from "./HowItWorks.jsx";
import Reasons from "./Reasons.jsx";
import Footer from "./Footer.jsx";
import { FlipPinnedOverlay } from "./FlipPinnedOverlay.jsx";

export default function Landing() {
  return (
    <>
      <Header
        logo={{ src: "/zono.png", alt: "Zono", href: "/" }}
        navItems={[
          { label: "Inicio", href: "#home" },
          { label: "¿Quienes somos?", href: "#quienes_somos" },
          { label: "Caracterias", href: "#features" },
          { label: "¿Como funciona?", href: "#functions" },
          { label: "¿Por que ZONO?", href: "#why_zono" },
        ]}
        cta={{ label: "Iniciar sesión", href: "https://ui.zono.cc/" }}
        height={80}
        compactHeight={64}
      />

      <FlipPinnedOverlay
        flipEase="power2.inOut"
        scrub={0.25}
        holdEnd={200}            
      >
        <Home />
        <AboutUs
          youtubeId="https://www.youtube.com/embed/py2LRfVc-IQ?si=tyX3YIP5q9UGELsx"
          ctaHref="https://docs.google.com/forms/d/e/1FAIpQLSeVFtm3CHkGyQSudbZ49xsSQWphEzCfgRk_mhabNENn96CCyw/viewform"
          ctaLabel="Regístrate GRATIS"
          ctaNewTab
        />
      </FlipPinnedOverlay>

      <UpdateWithoutDev />
      <HowItWorks videoUrl="https://www.youtube.com/embed/TU_ID" ctaHref="https://tusitio.com/registro" />
      <Reasons imageSrc="/minipanel.svg" onCtaClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSeVFtm3CHkGyQSudbZ49xsSQWphEzCfgRk_mhabNENn96CCyw/viewform", "_blank", "noopener,noreferrer")} />
      <Footer logoSrc="/zono.png" />
    </>
  );
}
