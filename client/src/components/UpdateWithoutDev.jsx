import React from "react";

const UpdateWithoutDev = () => {
  return (
    <section id="features" className="w-full min-h-screen lg:flex lg:items-center scroll-mt- 8 bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-200 py-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center px-6 gap-12">
        
        {/* Texto */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Actualiza, <br /> sin desarrollo.
          </h2>

          <p className="text-lg font-semibold text-gray-800">
            El poder en tus manos, actualiza tu página al instante sin desarrollo externo.
          </p>

          <p className="text-gray-700 leading-relaxed">
            Agrega productos de temporada, nuevas fotos para tu carrusel y actualiza precios inmediatamente en la nube desde cualquier dispositivo. 
            Nunca más tendrás que depender de un desarrollador externo para actualizar tu web.
          </p>

          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 transition-colors text-black font-bold px-8 py-4 rounded-full shadow-lg"
          >
            Empieza GRATIS
          </a>
        </div>

        {/* Imagen */}
        <div className="flex-1 flex justify-center h-full w-full">
          <img
            src="/pc.svg"
            alt="Panel de administración"
            className="w-full h-full md:max-w-lg drop-shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default UpdateWithoutDev;
