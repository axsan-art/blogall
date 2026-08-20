import SearchPosts from "@/components/SearchPosts";
import UnsplashImages from "@/components/UnsplashImages";

export default function ExplorarPage() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-4xl font-bold text-slate-800">
        Explorar publicaciones
      </h1>

      <p className="mt-4 text-slate-600">
        Aquí podrás encontrar publicaciones de diferentes categorías.
      </p>
      <SearchPosts />
      <UnsplashImages />
    </main>
  );
}