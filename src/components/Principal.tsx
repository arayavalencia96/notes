/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Principal() {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Carrousel />

        <div>
          <h1 className="text-5xl font-bold">
            Captura tus ideas y nunca las olvides
          </h1>
          <p className="py-6">
            Así es Memowise, quien te ayuda a organizar y recordar todo lo
            importante para tu día a día.
          </p>
          <button className="btn btn-primary" onClick={() => void signIn()}>
            Comenzar
          </button>
        </div>
      </div>
    </div>
  );
}

const Carrousel: React.FC = () => {
  const [imagenes] = useState<string[]>([
    "image.svg",
    "image1.svg",
    "image2.svg",
    "image3.svg",
  ]);
  const [indiceActual, setIndiceActual] = useState(0);
  const href = `#${imagenes[indiceActual]}`;

  const nextImg = () => {
    const siguienteIndice = (indiceActual + 1) % imagenes.length;
    setIndiceActual(siguienteIndice);
  };

  const lastImg = () => {
    if (href === "#image.svg") {
      setIndiceActual(3);
    } else {
      const anteriorIndice = (indiceActual - 1) % imagenes.length;
      setIndiceActual(anteriorIndice);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndiceActual((prevIndice) => (prevIndice + 1) % imagenes.length);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [imagenes.length]);

  return (
    <div className="carousel w-full max-w-sm rounded-lg shadow-2xl">
      <div
        id={imagenes[indiceActual]}
        className="carrousel-item relative w-full"
      >
        <img
          src={imagenes[indiceActual]}
          className="w-full"
          alt="Imagen del carrusel"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href={href} onClick={lastImg} className="btn btn-circle">
            ❮
          </a>
          <a href={href} onClick={nextImg} className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};
