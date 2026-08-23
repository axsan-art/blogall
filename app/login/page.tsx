"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function iniciarSesion(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMensaje(error.message);
      return;
    }

    setMensaje("Sesión iniciada correctamente.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-r from-orange-100 via-amber-50 to-yellow-100 px-6 py-12">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Iniciar sesión
          </h1>

          <p className="mt-3 text-slate-600">
            Ingresa a tu cuenta para continuar en BlogAll.
          </p>

          <form onSubmit={iniciarSesion} className="mt-6 space-y-5">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />

            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 hover:scale-105 transition-transform duration-200 text-white font-semibold px-6 py-3 rounded-lg"
            >
              Iniciar sesión
            </button>
          </form>

          {mensaje && (
            <p className="mt-4 text-slate-700">
              {mensaje}
            </p>
          )}
        </div>
      </div>
    </main>
  );
}

