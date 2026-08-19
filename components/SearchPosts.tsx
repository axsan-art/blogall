"use client";

import { useState } from "react";

const publicaciones = [
  {
    id: 1,
    titulo: "Los mejores videojuegos de 2026",
    categoria: "Videojuegos",
  },
  {
    id: 2,
    titulo: "Introducción a la inteligencia artificial",
    categoria: "Tecnología",
  },
  {
    id: 3,
    titulo: "Películas que debes conocer",
    categoria: "Entretenimiento",
  },
];

export default function SearchPosts() {
  const [busqueda, setBusqueda] = useState("");

  const publicacionesFiltradas = publicaciones.filter((publicacion) =>
    publicacion.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="mt-8">
      <input
        type="text"
        placeholder="Buscar publicaciones..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="w-full rounded-lg border border-slate-300 px-4 py-3"
      />

      <div className="mt-6 space-y-4">
        {publicacionesFiltradas.map((publicacion) => (
          <article
            key={publicacion.id}
            className="rounded-lg bg-white p-5 shadow-md"
          >
            <h2 className="text-xl font-bold text-slate-800">
              {publicacion.titulo}
            </h2>

            <p className="mt-2 text-orange-600">
              Categoría: {publicacion.categoria}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}