import React from "react";

const defaultDescription = (
  <>
    <span className="font-semibold text-yellow-500">ZONO</span> es un sistema que integra una
    <span className="font-semibold"> landing page</span>, una <span className="font-semibold">tienda online</span>
    {" "}y automatización para construir un <span className="font-semibold">embudo de ventas</span> que interactúa con tus clientes.
    Con ZONO puedes automatizar <span className="font-semibold">ventas</span>, la <span className="font-semibold">atención al cliente</span> y la
    {" "}<span className="font-semibold">entrega local</span>.
  </>
);

const Check = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={`w-5 h-5 ${props.className || ''}`}>
    <path d="M20 7L9 18l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function AboutUs({
  title = "¿Qué es ZONO?",
  tagline = "La nueva forma de vender.",
  description,
  ctaHref = "#registro",
  ctaLabel = "Regístrate GRATIS",
  ctaNewTab = true,
  className = "",
}) {
  const target = ctaNewTab ? "_blank" : undefined;
  const rel = ctaNewTab ? "noopener noreferrer" : undefined;

  return (
    <section id="quienes_somos" className={`bg-white min-h-screen lg:flex lg:items-center  scroll-mt- 10 text-black py-16 sm:py-20 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Encabezado */}
        <div className="mb-10 sm:mb-6" data-title="about">
          <p className="text-sm sm:text-base font-medium text-yellow-600 tracking-wide uppercase">{tagline}</p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            {title.replace(/ZONO/gi, '')}
            <span className="relative inline-block pl-2">
              <span className="absolute inset-x-0 bottom-1 h-3 bg-yellow-200/80 -z-10 rounded"></span>
              <span className="text-yellow-600">ZONO</span>
            </span>
          </h1>
        </div>

        {/* Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
         {/* Video */}
          <div className="lg:col-span-6" data-card="about-media">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="border-b-4 border-yellow-500">
                <div className="relative w-full aspect-video">
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube.com/embed/py2LRfVc-IQ?si=zinz2JDJ0klyNbT0`}
                    title="Video institucional ZONO"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Texto */}
          <div className="lg:col-span-6 xl:pr-8" data-card="about-text">
            <p className="text-lg leading-8 text-gray-800">
              {description || defaultDescription}
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-yellow-600"><Check /></span>
                <span>
                  <span className="font-semibold">Landing page</span> optimizada para captación de clientes.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-yellow-600"><Check /></span>
                <span>
                  <span className="font-semibold">Tienda online</span> integrada para convertir visitas en compras.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-yellow-600"><Check /></span>
                <span>
                  <span className="font-semibold">Automatización</span> de ventas, atención al cliente y entrega local.
                </span>
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href={ctaHref}
                target={target}
                rel={rel}
                className="inline-flex items-center justify-center rounded-full bg-yellow-500 px-6 sm:px-7 py-3 text-base font-semibold text-black shadow hover:bg-black hover:text-yellow-400 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                aria-label={ctaLabel}
              >
                {ctaLabel}
                <svg className="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

         
        </div>
      </div>
    </section>
  );
}

export default AboutUs;