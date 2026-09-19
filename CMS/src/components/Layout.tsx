import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Users, FileText, Settings as SettingsIcon, LogOut } from 'lucide-react';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();
  const location = useLocation();

  const menu = [
    { name: 'Paseadores', path: '/walkers', icon: Users },
    { name: 'Blog & SEO', path: '/blog', icon: FileText },
    { name: 'Contenido', path: '/settings', icon: SettingsIcon },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-orange-500">DoggoGo CMS</h1>
          <p className="text-sm text-slate-400">Admin Panel</p>
        </div>
        <nav className="flex-1 mt-6">
          {menu.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 transition-colors ${
                  active ? 'bg-orange-500/10 text-orange-400 border-r-4 border-orange-500' : 'hover:bg-slate-800 text-slate-300'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <button
          onClick={logout}
          className="flex items-center px-6 py-4 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mt-auto border-t border-slate-800"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Cerrar Sesión
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {children}
      </div>
    </div>
  );
};
