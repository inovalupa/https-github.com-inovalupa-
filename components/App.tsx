
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Megaphone, MessageSquareText, Menu, 
  LogOut, Database, UserCircle2, ShieldCheck, Bell 
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
    if (userRole === 'MARKETING') return [View.CAMPAIGNS, View.AI_CHAT, View.DASHBOARD].includes(view);
    return false;
  };

  const NavItem = ({ view, icon: Icon, label }: { view: View; icon: React.ElementType; label: string }) => (
    <button
      onClick={() => { setCurrentView(view); setIsSidebarOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
        currentView === view 
          ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20 scale-105 z-10' 
          : 'text-gray-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon size={20} className={currentView === view ? 'text-white' : 'group-hover:scale-110 transition-transform'} />
      <span className="font-semibold tracking-wide text-sm">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans relative">
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-brand-dark transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center justify-center mb-12">
            <DataFanLogo className="h-14 w-full" />
          </div>
          <nav className="space-y-3 flex-1">
            {canAccess(View.DASHBOARD) && <NavItem view={View.DASHBOARD} icon={LayoutDashboard} label="Visão Estratégica" />}
            {canAccess(View.DEMOGRAPHICS) && <NavItem view={View.DEMOGRAPHICS} icon={UserCircle2} label="Perfil da Torcida" />}
            {canAccess(View.INTEGRATIONS) && <NavItem view={View.INTEGRATIONS} icon={Database} label={userRole === 'SCIENTIST' ? "Cloudera Hub" : "Data Sources"} />}
            {canAccess(View.FANS) && <NavItem view={View.FANS} icon={Users} label="Gestão de Sócios" />}
            {canAccess(View.CAMPAIGNS) && <NavItem view={View.CAMPAIGNS} icon={Megaphone} label="Campaign Studio" />}
            {canAccess(View.AI_CHAT) && <NavItem view={View.AI_CHAT} icon={MessageSquareText} label="IA Strategist" />}
            
            {canAccess(View.USER_MANAGEMENT) && (
              <div className="pt-6 mt-6 border-t border-white/5">
                <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Administração</p>
                <NavItem view={View.USER_MANAGEMENT} icon={ShieldCheck} label="Permissões & IAM" />
              </div>
            )}
          </nav>
          
          <div className="pt-8 border-t border-white/5">
            <div className="bg-white/5 rounded-2xl p-4 mb-4 flex items-center gap-3">
               <div className="w-10 h-10 rounded-full border-2 border-brand-orange bg-gray-800 flex items-center justify-center text-white font-bold">
                 {userName.charAt(0)}
               </div>
               <div className="overflow-hidden">
                 <p className="text-sm font-bold text-white truncate">{userName}</p>
                 <p className="text-[10px] text-brand-orange font-bold uppercase">{userRole}</p>
               </div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-gray-500 hover:text-red-400 transition-colors rounded-xl hover:bg-red-400/5 group">
              <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
              <span className="text-sm font-semibold">Desconectar</span>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 flex items-center justify-between px-8 z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-600 p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-brand-blue hidden md:block">
              {currentView === View.DASHBOARD && "Visão Geral do Clube"}
              {currentView === View.FANS && "Base Unificada de Torcedores"}
              {currentView === View.AI_CHAT && "Consultora Data Fan AI"}
              {currentView === View.CAMPAIGNS && "Studio de Campanhas"}
              {currentView === View.INTEGRATIONS && "Integrações Enterprise"}
              {currentView === View.DEMOGRAPHICS && "Demografia da Torcida"}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-gray-400 hover:text-brand-blue transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-orange text-white text-[10px] flex items-center justify-center rounded-full font-bold">3</span>
            </button>
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-gray-500 hidden sm:block">CLUB DE REGATAS VASCO DA GAMA</span>
              <img src="https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png" alt="Vasco" className="h-10 w-auto drop-shadow-sm" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-gray-50/50 p-8 custom-scroll">
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
