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
          <a
            href="/"
            className="transition-transform duration-200 hover:scale-110"
          >
            Inicio
          </a>

          <a
            href="/explorar"
            className="transition-transform duration-200 hover:scale-110"
          >
            Explorar
          </a>

          {sesionActiva ? (
            <button
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
              onClick={cerrarSesion}
            >
              Cerrar sesión
            </button>
          ) : (
            <>
              <a
                href="/login"
                className="transition-transform duration-200 hover:scale-110"
              >
                Iniciar sesión
              </a>

              <a
                href="/register"
                className="transition-transform duration-200 hover:scale-110"
              >
                Registrarse
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}