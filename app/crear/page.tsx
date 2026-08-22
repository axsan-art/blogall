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

  const [rol, setRol] = useState("");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
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

      const { data: perfil, error: errorPerfil } = await supabase
        .from("profiles")
        .select("rol")
        .eq("id", user.id)
        .single();

      if (errorPerfil) {
        console.error("Error al obtener perfil:", errorPerfil);
        return;
      }

      setRol(perfil.rol);

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
  }, [router]);

  async function convertirseEnAutor() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ rol: "autor" })
      .eq("id", user.id);

    if (error) {
      console.error("Error al convertirse en autor:", error);
      setMensaje("No se pudo realizar el cambio.");
      return;
    }

    setRol("autor");
    setMensaje("Ahora eres Autor. Ya puedes crear publicaciones.");
  }

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

  if (rol === "lector") {
    return (
      <main className="min-h-screen p-8">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-slate-800">
            Hacer mi propia publicación
          </h1>

          <p className="mt-6 text-slate-600">
            Al hacer tu primera publicación te convertirás en Autor,
            por lo que podrás hacer más publicaciones, editar y eliminar
            tus publicaciones.
          </p>

          <button
            onClick={convertirseEnAutor}
            className="mt-6 bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Hacer mi propia publicación
          </button>

          {mensaje && (
            <p className="mt-4 text-slate-600">
              {mensaje}
            </p>
          )}
        </div>
      </main>
    );
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