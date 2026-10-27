import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, Users, BarChart3, Settings, LogOut } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', Icon: LayoutDashboard },
  { to: '/profile', label: 'Profile', Icon: User },
  { to: '/user', label: 'User', Icon: Users },
  { to: '/analytics', label: 'Analytics', Icon: BarChart3 },
  { to: '/settings', label: 'Settings', Icon: Settings },
];

function Sidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/Login', { replace: true });
  };

  return (
    <div className="w-64 h-screen bg-slate-900 text-slate-200 flex flex-col p-4 fixed left-0 top-0">
      <h1 className="text-xl font-bold text-white mb-8 px-2">Dashboard</h1>

      <nav className="flex flex-col gap-2">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <Icon className="w-5 h-5 mr-3" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      
      <div className="mt-auto border-t border-slate-700 pt-4">
        {user.name && (
          <div className="px-4 pb-3">
            <h className="text-sm font-medium text-white truncate">{user.name}</h>
            <p className="text-xs text-slate-400 truncate">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex w-full items-center px-4 py-3 text-sm font-medium rounded-lg text-red-400 transition-all duration-200 hover:bg-slate-800 hover:text-red-300"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
