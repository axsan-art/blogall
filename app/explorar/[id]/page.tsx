type PublicacionPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PublicacionPage({
  params,
}: PublicacionPageProps) {
  const { id } = await params;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-slate-800">
        Detalle de publicación
      </h1>

      <p className="mt-4 text-slate-600">
        Publicación con ID: {id}
      </p>
    </main>
  );
}