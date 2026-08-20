type UnsplashImage = {
  id: string;
  urls: {
    small: string;
  };
  alt_description: string | null;
};

export default async function UnsplashImages() {
  try {
    const response = await fetch(
      "https://api.unsplash.com/photos/random?count=3&query=blog",
      {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("No se pudieron obtener las imágenes");
    }

    const images: UnsplashImage[] = await response.json();

    return (
      <div className="grid gap-6 md:grid-cols-3">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.small}
            alt={image.alt_description || "Imagen de BlogAll"}
            className="w-full h-64 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>
    );
  } catch {
    return (
      <p className="text-red-600">
        No se pudieron cargar las imágenes.
      </p>
    );
  }
}