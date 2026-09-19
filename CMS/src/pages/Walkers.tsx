import { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';

interface Walker {
  uid: string;
  name: string;
  rate: number;
  status?: 'active' | 'blocked';
  freeAccess?: boolean;
}

export const Walkers = () => {
  const [walkers, setWalkers] = useState<Walker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWalkers();
  }, []);

  const fetchWalkers = async () => {
    const snapshot = await getDocs(collection(db, 'walkers'));
    const list: Walker[] = [];
    snapshot.forEach(doc => list.push({ uid: doc.id, ...doc.data() } as Walker));
    setWalkers(list);
    setLoading(false);
  };

  const toggleStatus = async (uid: string, currentStatus: string | undefined) => {
    const newStatus = currentStatus === 'blocked' ? 'active' : 'blocked';
    await updateDoc(doc(db, 'walkers', uid), { status: newStatus });
    fetchWalkers();
  };

  const toggleFreeAccess = async (uid: string, hasFreeAccess: boolean | undefined) => {
    await updateDoc(doc(db, 'walkers', uid), { freeAccess: !hasFreeAccess });
    fetchWalkers();
  };

  if (loading) return <div>Cargando paseadores...</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-slate-800 mb-8">Gestión de Paseadores</h2>
      
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-600">Nombre</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Tarifa / h</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Estado</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Acceso App</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Suscripción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {walkers.map(walker => (
              <tr key={walker.uid} className="hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">{walker.name || 'Sin nombre'}</td>
                <td className="px-6 py-4">${walker.rate || 0} USD</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${walker.status === 'blocked' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                    {walker.status === 'blocked' ? 'Bloqueado' : 'Activo'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleStatus(walker.uid, walker.status)}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {walker.status === 'blocked' ? 'Desbloquear' : 'Bloquear'}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => toggleFreeAccess(walker.uid, walker.freeAccess)}
                    className={`text-sm px-3 py-1 rounded-md text-white ${walker.freeAccess ? 'bg-slate-800' : 'bg-orange-500'}`}
                  >
                    {walker.freeAccess ? 'Quitar Pase VIP' : 'Dar Pase VIP'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
