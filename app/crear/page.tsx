"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Categoria = {
  id: number;
  nombre: string;
};

export default function CrearPage() {
  const router = useRouter();

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    async function cargarCategorias() {
      const { data, error } = await supabase
        .from("categorias")
        .select("id, nombre");

      if (error) {
        console.error("Error al cargar categorías:", error);
        return;
      }

      setCategorias(data || []);
    }

    cargarCategorias();
  }, []);

  async function crearPublicacion(e: React.FormEvent) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase.from("publicaciones").insert({
      titulo,
      contenido,
      categoria_id: Number(categoriaId),
      autor_id: user.id,
    });

    if (error) {
      console.error("Error al crear publicación:", error);
      setMensaje("No se pudo crear la publicación.");
      return;
    }

    setMensaje("Publicación creada correctamente.");

    setTitulo("");
    setContenido("");
    setCategoriaId("");
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800">
          Crear publicación
        </h1>

        <form onSubmit={crearPublicacion} className="mt-8 space-y-5">
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
            required
          />

          <textarea
            placeholder="Contenido"
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
            rows={6}
            required
          />

          <select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="w-full rounded-lg border border-orange-300 bg-white px-4 py-3 text-slate-800"
            required
          >
            <option value="">Selecciona una categoría</option>

            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Publicar
          </button>
        </form>

        {mensaje && (
          <p className="mt-4 text-slate-600">
            {mensaje}
          </p>
        )}
      </div>
    </main>
  );
}