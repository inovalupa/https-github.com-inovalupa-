
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Megaphone, MessageSquareText, Menu, 
  LogOut, Database, UserCircle2, ShieldCheck 
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import FanBase from './components/FanBase';
import Campaigns from './components/Campaigns';
import ChatAssistant from './components/ChatAssistant';
import Integrations from './components/Integrations';
import Demographics from './components/Demographics';
import Login from './components/Login';
import UserManagement from './components/UserManagement';

enum View {
  DASHBOARD = 'dashboard',
  FANS = 'fans',
  DEMOGRAPHICS = 'demographics',
  CAMPAIGNS = 'campaigns',
  INTEGRATIONS = 'integrations',
  AI_CHAT = 'ai_chat',
  USER_MANAGEMENT = 'user_management'
}

type UserRole = 'EXECUTIVE' | 'SCIENTIST' | 'MARKETING' | null;

interface SystemUser {
  username: string;
  role: UserRole;
  displayName: string;
}

const INITIAL_USERS: SystemUser[] = [
  { username: 'thadeu corteletti', role: 'EXECUTIVE', displayName: 'Thadeu Corteletti' },
  { username: 'dan lopes', role: 'MARKETING', displayName: 'Dan Lopes' },
  { username: 'sysadmin', role: 'SCIENTIST', displayName: 'Engenheiro de Dados' }
];

const DataFanLogo = ({ className = "h-12" }: { className?: string }) => (
  <svg viewBox="0 0 280 85" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      <text x="0" y="48" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="52" fill="#FF6B00" letterSpacing="-2">Data</text>
      <text x="25" y="80" fontFamily="'Inter', sans-serif" fontStyle="italic" fontWeight="600" fontSize="42" fill="white" letterSpacing="-1">fan</text>
    </g>
    <g transform="translate(145, 5)">
      <path d="M20 10 H 60 C 105 10 105 75 60 75 H 20 V 10" stroke="#FF6B00" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M45 28 V 58" stroke="#FF6B00" strokeWidth="5" strokeLinecap="round" />
      <path d="M45 28 H 75" stroke="#FF6B00" strokeWidth="5" strokeLinecap="round" />
      <circle cx="75" cy="28" r="4" fill="white" stroke="#FF6B00" strokeWidth="2" />
      <path d="M45 45 H 65" stroke="#FF6B00" strokeWidth="5" strokeLinecap="round" />
      <circle cx="65" cy="45" r="4" fill="white" stroke="#FF6B00" strokeWidth="2" />
      <circle cx="105" cy="42.5" r="6" fill="#0B1E3B" stroke="#FF6B00" strokeWidth="3" />
      <circle cx="20" cy="10" r="5" fill="#FF6B00" />
      <circle cx="20" cy="75" r="5" fill="#FF6B00" />
    </g>
  </svg>
);

const App: React.FC = () => {
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string>('');
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const handleLogin = (role: UserRole, name: string) => {
    setUserRole(role);
    setUserName(name);
    if (role === 'MARKETING') setCurrentView(View.CAMPAIGNS);
    else if (role === 'SCIENTIST') setCurrentView(View.INTEGRATIONS);
    else setCurrentView(View.DASHBOARD);
  };

  const handleLogout = () => {
    setUserRole(null);
    setUserName('');
  };

  if (!userRole) {
    return <Login onLogin={handleLogin as any} LogoComponent={DataFanLogo} users={users as any} />;
  }

  const canAccess = (view: View) => {
    if (userRole === 'SCIENTIST') return [View.INTEGRATIONS, View.USER_MANAGEMENT].includes(view);
    if (userRole === 'EXECUTIVE') return true;
    if (userRole === 'MARKETING') return [View.CAMPAIGNS, View.AI_CHAT].includes(view);
    return false;
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: React.ElementType; label: string }) => (
    <button
      onClick={() => { setCurrentView(view); setIsSidebarOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        currentView === view ? 'bg-brand-orange text-white shadow-md' : 'text-gray-300 hover:bg-white/10 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-[#F3F4F6] overflow-hidden font-sans relative">
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-brand-blue transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-center mb-10 mt-2">
            <DataFanLogo className="h-16 w-full" />
          </div>
          <nav className="space-y-2 flex-1">
            {canAccess(View.DASHBOARD) && <NavItem view={View.DASHBOARD} icon={LayoutDashboard} label="Visão Geral" />}
            {canAccess(View.DEMOGRAPHICS) && <NavItem view={View.DEMOGRAPHICS} icon={UserCircle2} label="Perfil da Torcida" />}
            {canAccess(View.INTEGRATIONS) && <NavItem view={View.INTEGRATIONS} icon={Database} label={userRole === 'SCIENTIST' ? "Cloudera Manager" : "Fontes de Dados"} />}
            {canAccess(View.FANS) && <NavItem view={View.FANS} icon={Users} label="Base de Torcedores" />}
            {canAccess(View.CAMPAIGNS) && <NavItem view={View.CAMPAIGNS} icon={Megaphone} label="Campanhas" />}
            {canAccess(View.AI_CHAT) && <NavItem view={View.AI_CHAT} icon={MessageSquareText} label="Consultora IA" />}
            {canAccess(View.USER_MANAGEMENT) && (
              <div className="pt-4 mt-4 border-t border-white/10">
                <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Admin</p>
                <NavItem view={View.USER_MANAGEMENT} icon={ShieldCheck} label="Gestão de Usuários" />
              </div>
            )}
          </nav>
          <div className="pt-6 border-t border-white/10 space-y-2">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-300 transition-colors">
              <LogOut size={20} />
              <span className="text-sm">Sair</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 lg:px-8 z-10">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-600">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <img src="https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png" alt="Vasco" className="h-10 w-auto" />
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-brand-blue">{userName}</p>
              <p className="text-xs text-gray-500 uppercase">{userRole}</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-brand-orange bg-gray-200"></div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {currentView === View.DASHBOARD && <Dashboard />}
            {currentView === View.DEMOGRAPHICS && <Demographics />}
            {currentView === View.FANS && <FanBase />}
            {currentView === View.CAMPAIGNS && <Campaigns />}
            {currentView === View.AI_CHAT && <ChatAssistant />}
            {currentView === View.INTEGRATIONS && <Integrations userRole={userRole as any} />}
            {currentView === View.USER_MANAGEMENT && <UserManagement users={users as any} onAddUser={(u: any) => setUsers([...users, u])} onRemoveUser={(un: any) => setUsers(users.filter(u => u.username !== un))} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
