import React from "react";

const Home = () => {
    return (
        <section id="home" className="min-h-[100vh] flex items-center justify- bg-white text-gray-900 lg:pt- 30 ">
            <div className="container mx-auto flex flex-col md:flex-row items-center max-w-7xl px-6 py-25 gap-10 ">

                <div className="flex-1 space-y-6" data-card="home-text">
                    {/* <img 
            src="/zono.png" 
            alt="Zono" 
            className="h-40 mb-1"
          /> */}
                    <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                        Duplica tus ventas en <span className="text-yellow-500">90 días</span>
                    </h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Tu tienda virtual en la nube para automatizar ventas y atender a tus clientes.
                        <span className="font-semibold text-gray-900">
                            {" "}Empieza GRATIS{" "}
                        </span>
                        a vender en línea y automatizar tu negocio.
                    </p>
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeVFtm3CHkGyQSudbZ49xsSQWphEzCfgRk_mhabNENn96CCyw/viewform"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-yellow-500 hover:bg-yellow-600 transition-colors px-6 py-3 rounded-full text-lg font-semibold text-white shadow-lg"
                    >
                        Quiero mi tienda
                    </a>
                </div>
                <div className="flex-1 flex justify-center w-full h-full" data-card="home-media">
                    <div className="relative w-full">
                        <div className="absolute -top-4 -right-4 w-30 h-30 bg-yellow-100 rounded-full blur-2xl opacity-50"></div>
                        <iframe
                            className="rounded-2xl shadow-2xl border border-gray-200 w-full aspect-video"
                            src="https://www.youtube.com/embed/VYOFxpbEJqE?si=Hs3y70ackO1Pv-wE"
                            title="Presentación Zono"
                            allowFullScreen
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Home;