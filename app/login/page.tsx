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
    <main className="min-h-screen p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-slate-800">
          Iniciar sesión
        </h1>

        <form onSubmit={iniciarSesion} className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-4 py-2"
            required
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-4 py-2"
            required
          />

          <button
            type="submit"
            className="bg-slate-900 text-white px-4 py-2 rounded"
          >
            Iniciar sesión
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