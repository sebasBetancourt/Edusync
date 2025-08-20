import React from "react";
import { motion } from "framer-motion";

/* ---- Temas del proyecto ---- */
const themeClasses = {
  dark: {
    section: "bg-black",
    title: "text-white",
    subtitle: "text-zinc-300",
    body: "text-zinc-300",
    card: "bg-zinc-900/70 ring-1 ring-white/10",
    badge: "bg-amber-400/15 text-amber-300 ring-1 ring-amber-300/30",
    cta: "bg-amber-400 hover:bg-amber-300 text-black focus-visible:outline-amber-300",
    link: "text-amber-300 hover:text-amber-200",
  },
};

export default function HowItWorks({
  title = "¿Cómo funciona?",
  kicker = "Mira este demo.",
  lead = "Acá te mostramos cómo se ve tu página ZONO, tu Tienda Online y el Admin Panel para gestionarlo todo en tiempo real.",
  points = [
    "Configura tu catálogo y precios una sola vez.",
    "Recibe pedidos en tiempo real desde web y WhatsApp.",
    "Administra estados, pagos y entregas desde un solo panel.",
  ],
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ", // reemplaza con tu URL
  note = "También te mostramos cómo se procesa un pedido cuando un cliente compra.",
  ctaText = "Regístrate GRATIS",
  ctaHref = "#registro",
  secondaryText = "Ver documentación",
  secondaryHref = "#docs",
  theme = "dark",
}) {
  const t = themeClasses[theme];

  return (
    <section id="functions" className={`${t.section} relative overflow-hidden py-20 sm:py-24 min-h-screen lg:flex lg:items-center lg:justify-center
        bg-gradient-to-b from-black via-neutral-800 to-neutral-700

`}>
      {/* from-neutral-800 via-neutral-700 to-neutral-600

        from-black via-neutral-900 to-neutral-800 */}
      {/* halos suaves para profundidad */}
      <div className="pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(60%_60%_at_50%_30%,black,transparent)]">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 py-20 sm:py-24 lg:grid-cols-2">
        {/* Columna izquierda: Video */}
        <motion.div
          className={`rounded-2xl hidden lg:flex p-2 sm:p-3 ring-1 ${t.card} order-1 lg:order-none`}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <div className="relative  aspect-video w-full overflow-hidden rounded-xl">
          <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/ku0UQgaTe9A?si=3qWYWrQafKIPpfB7"
                title="Presentación Zono"
                allowFullScreen
              />
          </div>
        </motion.div>

        {/* Columna derecha: Texto */}
        <div className="mx-auto max-w-xl">
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${t.badge}`}>
            <span>Demo en tiempo real</span>
          </div>

          <h2 className={`mt-4 text-3xl font-bold tracking-tight sm:text-4xl ${t.title}`}>
            {title}
          </h2>

          <p className={`mt-2 text-lg ${t.subtitle}`}>{kicker}</p>

          <motion.div
            className={`rounded-2xl my-[2vh] lg:hidden p-2 sm:p-3 ring-1 ${t.card} order-1 lg:order-none`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45 }}
          >
            <div className="relative  aspect-video w-full overflow-hidden rounded-xl">

              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/ku0UQgaTe9A?si=3qWYWrQafKIPpfB7"
                title="Presentación Zono"
                allowFullScreen
              />
            </div>
          </motion.div>
          <p className={`mt-5 ${t.body}`}>{lead}</p>

          <ul className="mt-6 space-y-3">
            {points.map((p, i) => (
              <li key={i} className={`flex gap-3 ${t.body}`}>
                <span className="mt-1 inline-block h-2 w-2 shrink-0 translate-y-1 rounded-full bg-amber-400" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          {note && <p className={`mt-5 text-sm ${t.subtitle}`}>{note}</p>}


          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-full px-7 py-3 text-base font-semibold shadow-lg transition-all focus-visible:outline focus-visible:outline-2 ${t.cta}`}
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
