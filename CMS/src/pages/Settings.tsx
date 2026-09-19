export const Settings = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-8">Contenido de la App</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h3 className="text-xl font-bold text-slate-700 mb-4">Textos Principales</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">Lema de la Aplicación</label>
          <input 
            type="text" 
            defaultValue="¡Paseos con energía!"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-600 mb-2">Mensaje de Bienvenida (Dueños)</label>
          <textarea 
            defaultValue="Encuentra al paseador ideal cerca de ti."
            rows={3}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        <button className="bg-slate-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-slate-700 transition-colors">
          Guardar Cambios
        </button>
      </div>
    </div>
  );
};
