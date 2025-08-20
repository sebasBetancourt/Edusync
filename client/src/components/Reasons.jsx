import React from "react";

export default function Reasons({
    imageSrc = "/super_panel.png",
    imageAlt = "Panel de control moderno con métricas de ventas",
    onCtaClick = () => { },
    ctaLabel = "¡Empieza Ya! GRATIS",
    title = "5 razones por las que deberías automatizar tu negocio con",
    subtitle = "ZONO",
    reasons = [
        "Vendes más porque cada cliente que te escribe lo autoatiendes.",
        "Aumentas la eficiencia de tu negocio con la automatización.",
        "Actualiza tu página, productos, precios y más sin desarrollo externo.",
        "Todos los pagos son directos de tu cliente a ti, sin intermediarios.",
        "Capturas todos tus clientes y construyes una base de datos.",
    ],
    note = "¿Sabías que el 90% de negocios pueden duplicar sus ventas en 3 meses con ZONO? ¿Qué esperas para empezar?",
}) {
    return (
        <section
        id="why_zono"
            className=" relative py-20 sm:py-8 bg-gradient-to-b from-neutral-700 via-neutral-800 to-black">
            {/* Contenedor */}
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Cabecera */}


                {/* Grid principal */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
                    {/* Columna izquierda: Imagen / Mockup */}
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full h-[400px] sm:h-[360px] lg:h-full object-cover object-top lg:object-center"
                        loading="lazy"
                    />

                    {/* Columna derecha: Lista + CTA */}
                    {/* Columna derecha: Título + Lista + CTA */}
                    <div className="order-1 lg:order-2">
                        {/* Encabezado semántico y accesible */}
                        <div className="order-1 lg:order-2">
                            <div className="max-w-2xl">
                                <h2
                                    className=" text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-50 leading-tight">
                                    {title}{" "}
                                    <span
                                        className=" bg-gradient-to-r from-amber-400 via-amber-500 to-amber-400 bg-clip-text text-transparent drop-shadow-sm">
                                        ZONO
                                    </span>
                                </h2>

                            </div>
                        </div>


                        {/* Contenido de la columna (lista de razones) */}
                        <ul className="mt-8 space-y-5">
                            {reasons.map((text, i) => (
                                <li key={i} className="flex items-start gap-4">
                                    <span
                                        className="mt-1 inline-flex h-8 w-8 flex-none items-center justify-center rounded-full bg-amber-500/15 ring-1 ring-amber-400/30"
                                        aria-hidden="true"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            className="h-5 w-5 text-amber-400"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M20 6L9 17l-5-5" />
                                        </svg>
                                    </span>
                                    <p className="text-base sm:text-lg leading-relaxed text-neutral-200">
                                        <span className="font-semibold text-neutral-100">{i + 1}.</span>{" "}
                                        {text}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        {/* Nota + CTA */}
                        <div className="mt-10 rounded-2xl border border-white/10 bg-neutral-900/40 p-6 sm:p-7">
                            <p className="text-sm sm:text-base text-neutral-200">{note}</p>

                            <div className="mt-6">
                                <button
                                    onClick={onCtaClick}
                                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold bg-amber-500 text-neutral-900 shadow hover:shadow-lg transition hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-amber-400/60"
                                    aria-labelledby="reasons-title"
                                >
                                    {ctaLabel}
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separador sutil inferior para transición con la siguiente sección */}
                <div className="mt-14 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
        </section>
    );
}
