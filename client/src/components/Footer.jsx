import React from "react";
import { FaWhatsapp, FaGlobe, FaPhone, FaEnvelope, FaInstagram } from "react-icons/fa";

/**
 * Footer ZONO – sólido, elegante y corporativo
 *
 * Props opcionales:
 *  - logoSrc?: string  -> ruta del logo (PNG/SVG). Si no se pasa, se muestra el logotipo tipográfico.
 */
export default function ZonoFooter({ logoSrc }) {
    return (
        <footer
            className="bg-neutral-800 text-neutral-200"
            aria-labelledby="footer-heading"
            itemScope
            itemType="https://schema.org/Organization"
        >
            {/* Contenido principal */}
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid gap-12 md:gap-16 lg:grid-cols-12 items-start">
                    {/* Marca / Logo grande */}
                    <div className="lg:col-span-5">
                        <a href="https://www.zono.cc" target="_blank" rel="noopener noreferrer" className="block">
                            {logoSrc ? (
                                <img
                                    src={logoSrc}
                                    alt="ZONO"
                                    className="w-[220px] sm:w-[260px] md:w-[150px] h-auto select-none pointer-events-none"
                                    itemProp="logo"
                                />
                            ) : (
                                <div className="select-none">
                                    {/* Logotipo tipográfico simple (fallback) */}
                                    <span
                                        className="block text-5xl sm:text-6xl font-black tracking-wide"
                                        style={{
                                            background:
                                                "linear-gradient(180deg,#ffd27a 0%, #e2a43f 45%, #ad781c 100%)",
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",
                                        }}
                                        itemProp="name"
                                    >
                                        ZONO
                                    </span>
                                </div>
                            )}
                        </a>

                        <h2 id="footer-heading" className="sr-only">
                            Información de la compañía
                        </h2>


                        <p className="mt-6 text-xl md:text-2xl font-semibold">
                            El futuro es <span className="text-white">automático.</span>
                        </p>
                    </div>

                    {/* Contacto */}
                    <div className="lg:col-span-4">
                        <h3 className="text-white text-lg font-bold tracking-wide">Contacto</h3>
                        <ul className="mt-5 space-y-4 text-base">
                            <li className="flex items-center gap-3">
                                <FaGlobe aria-hidden className="shrink-0" />
                                <a
                                    href="https://www.zono.cc"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-white transition"
                                    itemProp="url"
                                >
                                    www.zono.cc
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhone aria-hidden className="shrink-0" />
                                <a href="tel:+573152155063" className="hover:text-white transition" itemProp="telephone">
                                    +57 315 215 5063
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope aria-hidden className="shrink-0" />
                                <a
                                    href="mailto:info@zono.cc"
                                    className="hover:text-white transition"
                                    itemProp="email"
                                >
                                    info@zono.cc
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaInstagram aria-hidden className="shrink-0" />
                                <span className="opacity-90" itemProp="sameAs">
                                    @zono.cc / @zonoclub
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* CTA WhatsApp */}
                    <div className="lg:col-span-3">
                        <div className="flex lg:justify-end">
                            <a
                                href="https://wa.me/573152155063"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 rounded-full px-6 py-3 font-semibold bg-green-600 hover:bg-green-700 text-white transition"
                            >
                                <FaWhatsapp className="text-xl" />
                                Escríbenos por WhatsApp
                            </a>
                        </div>

                        <div className="mt-8 text-sm leading-6 opacity-80">
                            <p>
                                Atención comercial de lunes a viernes. Resolvemos tus dudas y te
                                acompañamos en la automatización de tu negocio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Línea divisoria sutil */}
            <div className="border-t border-white/10" />

            {/* Barra inferior */}
            <div className="max-w-6xl mx-auto px-6 py-6 text-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between none">
                <p className="opacity-80">
                    © {new Date().getFullYear()} ZONO VENTURES SAS. Todos los derechos reservados.
                </p>

                <div className="opacity-80">
                    <span className="font-semibold">ZONO VENTURES SAS </span>
                    <span className="opacity-80">NIT: 901577204</span>
                </div>
            </div>
        </footer>
    );
}
