type NavbarProps = {
  nombre: string;
};

export default function Navbar({ nombre }: NavbarProps) {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {nombre}
        </h1>

        <div className="flex gap-6">
          <a href="/">Inicio</a>
          <a href="/explorar">Explorar</a>
          <a href="/login">Iniciar sesión</a>
          <a href="/register">Registrarse</a>
        </div>
      </div>
    </nav>
  );
}