"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type NavbarProps = {
  nombre: string;
};

export default function Navbar({ nombre }: NavbarProps) {
  const router = useRouter();
  const [sesionActiva, setSesionActiva] = useState(false);

  useEffect(() => {
    async function comprobarSesion() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSesionActiva(!!session);
    }

    comprobarSesion();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSesionActiva(!!session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function cerrarSesion() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <nav className="bg-slate-900 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {nombre}
        </h1>

        <div className="flex gap-6">
          <a href="/">Inicio</a>
          <a href="/explorar">Explorar</a>

          {sesionActiva ? (
            <button className="cursor-pointer"
            onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          ) : (
            <>
              <a href="/login">Iniciar sesión</a>
              <a href="/register">Registrarse</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}