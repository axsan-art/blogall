import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-r from-orange-300 via-amber-200 to-yellow-100 flex flex-col items-center justify-center gap-6">

      <h1 className="text-5xl font-bold text-slate-800">
        Bienvenido a <span className="text-orange-600">BlogAll</span>
      </h1>

     <p className="text-lg text-slate-700 max-w-md text-center">
      El blog donde puedes expresarte 
     </p>

     <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md">
      Explorar Temas
     </button>

    </main>
  )
}