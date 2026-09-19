export const Blog = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800">Blog & SEO</h2>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-orange-600 transition-colors">
          + Nuevo Artículo
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
        No hay artículos publicados todavía. Usa el botón de arriba para escribir tu primer post (Ej. "Beneficios del Sniffari en perros urbanos") y mejorar el SEO de DoggoGo.
      </div>
    </div>
  );
};
