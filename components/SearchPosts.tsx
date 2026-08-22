"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Publicacion = {
  id: number;
  titulo: string;
  contenido: string;
  categoria_id: number;
  categorias: {
  nombre: string;
}[];
};

export default function SearchPosts() {
  const [busqueda, setBusqueda] = useState("");
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);

  useEffect(() => {
    async function cargarPublicaciones() {
      const { data, error } = await supabase
        .from("publicaciones")
        .select(`
          id,
          titulo,
          contenido,
          categoria_id,
          categorias (
            nombre
          )
        `);

      if (error) {
        console.error("Error al cargar publicaciones:", error);
        return;
      }

      setPublicaciones(data || []);
    }

    cargarPublicaciones();
  }, []);

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

            <p className="mt-2 text-slate-600">
              {publicacion.contenido}
            </p>

            <p className="mt-2 text-orange-600">
              Categoría: {publicacion.categorias[0]?.nombre}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}