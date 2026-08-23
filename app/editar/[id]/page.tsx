"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type Categoria = {
  id: number;
  nombre: string;
};

export default function EditarPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    async function cargarDatos() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: publicacion, error } = await supabase
        .from("publicaciones")
        .select("titulo, contenido, categoria_id")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error al cargar publicación:", error);
        setMensaje("No se pudo cargar la publicación.");
        return;
      }

      setTitulo(publicacion.titulo);
      setContenido(publicacion.contenido);
      setCategoriaId(String(publicacion.categoria_id));

      const { data: datosCategorias, error: errorCategorias } =
        await supabase
          .from("categorias")
          .select("id, nombre");

      if (errorCategorias) {
        console.error("Error al cargar categorías:", errorCategorias);
        return;
      }

      setCategorias(datosCategorias || []);
    }

    cargarDatos();
  }, [id, router]);

  async function guardarCambios(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from("publicaciones")
      .update({
        titulo,
        contenido,
        categoria_id: Number(categoriaId),
      })
      .eq("id", id);

    if (error) {
      console.error("Error al actualizar publicación:", error);
      setMensaje("No se pudo actualizar la publicación.");
      return;
    }

    setMensaje("Publicación actualizada correctamente.");

    setTimeout(() => {
      router.push("/explorar");
    }, 1000);
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800">
          Editar publicación
        </h1>

        <form onSubmit={guardarCambios} className="mt-8 space-y-5">
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
            required
          />

          <textarea
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
            Guardar cambios
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