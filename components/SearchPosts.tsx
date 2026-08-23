"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Publicacion = {
  id: number;
  titulo: string;
  contenido: string;
  categoria_id: number;
  autor_id: string;
  categorias: {
    nombre: string;
  };
};

export default function SearchPosts() {
  const router = useRouter();

  const [busqueda, setBusqueda] = useState("");
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [usuarioId, setUsuarioId] = useState("");

  useEffect(() => {
    async function cargarPublicaciones() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUsuarioId(user.id);
      }

      const { data, error } = await supabase
        .from("publicaciones")
        .select(`
          id,
          titulo,
          contenido,
          categoria_id,
          autor_id,
          categorias (
            nombre
          )
        `);

      if (error) {
        console.error("Error al cargar publicaciones:", error);
        return;
      }

      setPublicaciones(
        data.map((publicacion) => ({
          ...publicacion,
          categorias: Array.isArray(publicacion.categorias)
            ? publicacion.categorias[0]
            : publicacion.categorias,
        }))
      );
    }

    cargarPublicaciones();
  }, []);

  const publicacionesFiltradas = publicaciones.filter((publicacion) =>
    publicacion.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  async function eliminarPublicacion(id: number) {
    const confirmar = window.confirm(
      "¿Estás seguro de que quieres eliminar esta publicación?"
    );

    if (!confirmar) {
      return;
    }

    const { error } = await supabase
      .from("publicaciones")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error al eliminar publicación:", error);
      return;
    }

    window.location.reload();
  }

  return (
    <div className="mt-8">
      <button
        onClick={() => router.push("/crear")}
        className="mb-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg"
      >
        Crear publicación
      </button>

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
              Categoría: {publicacion.categorias.nombre}
            </p>

            {publicacion.autor_id === usuarioId && (
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => router.push(`/editar/${publicacion.id}`)}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Editar
                </button>

                <button
                  onClick={() => eliminarPublicacion(publicacion.id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}