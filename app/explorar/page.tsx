"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SearchPosts from "@/components/SearchPosts";

export default function ExplorarPage() {
  const router = useRouter();

  useEffect(() => {
    async function comprobarSesion() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
      }
    }

    comprobarSesion();
  }, [router]);

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-slate-800">
        Explorar publicaciones
      </h1>

      <p className="mt-4 text-slate-600">
        Aquí podrás encontrar publicaciones de diferentes categorías.
      </p>

      <SearchPosts />
    </main>
  );
}