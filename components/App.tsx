
import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Megaphone, MessageSquareText, Menu, 
  LogOut, Database, UserCircle2, ShieldCheck, Bell, X, AlertCircle, TrendingUp
} from 'lucide-react';
import Dashboard from './Dashboard';
import FanBase from './FanBase';
import Campaigns from './Campaigns';
import ChatAssistant from './ChatAssistant';
import Integrations from './Integrations';
import Demographics from './Demographics';
import Login from './Login';
import UserManagement from './UserManagement';

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
  { username: 'diretoria america', role: 'EXECUTIVE', displayName: 'Diretoria AFC' },
  { username: 'marketing coelho', role: 'MARKETING', displayName: 'Marketing América' },
  { username: 'sysadmin', role: 'SCIENTIST', displayName: 'Analista de Dados' }
];

const DataFanLogo = ({ className = "h-12" }: { className?: string }) => (
  <svg viewBox="0 0 520 85" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Texto Data Fan - Identidade Principal */}
    <text x="0" y="45" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="48" fill="#008037" letterSpacing="-2">Data</text>
    <text x="5" y="75" fontFamily="Inter, sans-serif" fontStyle="italic" fontWeight="600" fontSize="36" fill="white" opacity="0.9" letterSpacing="-1">fan</text>
    
    {/* Separador Vertical Minimalista */}
    <line x1="135" y1="20" x2="135" y2="70" stroke="white" strokeWidth="2" opacity="0.2" />
    
    {/* Tipografia América Mineiro - Padrão Site Oficial */}
    <text x="155" y="48" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="44" fill="white" letterSpacing="-1">AMÉRICA</text>
    <text x="157" y="76" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="18" fill="#008037" letterSpacing="6">MINEIRO</text>
  </svg>
);

const App: React.FC = () => {
  const [users, setUsers] = useState<SystemUser[]>(INITIAL_USERS);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string>('');
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationPanelOpen, setIsNotificationPanelOpen] = useState(false);
  
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
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#051a0d] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col p-8">
          <div className="flex items-center justify-start mb-12">
            <DataFanLogo className="h-14 w-auto max-w-full" />
          </div>
          <nav className="space-y-3 flex-1">
            {canAccess(View.DASHBOARD) && <NavItem view={View.DASHBOARD} icon={LayoutDashboard} label="Dashboard Coelhão" />}
            {canAccess(View.DEMOGRAPHICS) && <NavItem view={View.DEMOGRAPHICS} icon={UserCircle2} label="Perfil Americano" />}
            {canAccess(View.INTEGRATIONS) && <NavItem view={View.INTEGRATIONS} icon={Database} label={userRole === 'SCIENTIST' ? "Cloudera Hub" : "Fontes de Dados"} />}
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
               <div className="w-10 h-10 rounded-full border-2 border-brand-orange bg-[#008037] flex items-center justify-center text-white font-bold">
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 flex items-center justify-between px-8 z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-gray-600 p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold text-brand-blue hidden md:block">
              {currentView === View.DASHBOARD && "Dashboard América Mineiro"}
              {currentView === View.FANS && "Base de Sócios Onda Verde"}
              {currentView === View.AI_CHAT && "Data Fan IA Coelhão"}
              {currentView === View.CAMPAIGNS && "Campaign Studio Pro"}
              {currentView === View.INTEGRATIONS && "Hub de Integrações"}
              {currentView === View.DEMOGRAPHICS && "Demografia Americanista"}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsNotificationPanelOpen(true)}
              className="relative text-gray-400 hover:text-brand-blue transition-colors p-2 hover:bg-gray-50 rounded-full"
            >
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-brand-orange text-white text-[9px] flex items-center justify-center rounded-full font-bold border-2 border-white">3</span>
            </button>
            <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-black text-brand-blue leading-tight uppercase tracking-tighter">AMÉRICA MINEIRO</p>
                <p className="text-[10px] text-brand-orange font-bold uppercase tracking-[0.2em]">Belo Horizonte, MG</p>
              </div>
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

        {/* Notification Panel Sidebar */}
        {isNotificationPanelOpen && (
          <>
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in" onClick={() => setIsNotificationPanelOpen(false)}></div>
            <aside className="fixed right-0 inset-y-0 w-80 bg-white shadow-2xl z-50 animate-fade-in border-l border-gray-100 flex flex-col">
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                <h3 className="font-bold text-brand-blue flex items-center gap-2">
                   <Bell size={18} className="text-brand-orange" /> Alertas Coelhão
                </h3>
                <button onClick={() => setIsNotificationPanelOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                  <div className="flex items-center gap-2 text-red-600 mb-2">
                    <AlertCircle size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Alto Risco</span>
                  </div>
                  <p className="text-xs font-bold text-brand-blue">Segmento Coelhão Black em declínio</p>
                  <p className="text-[11px] text-gray-500 mt-1">Aumento de 5% no risco de churn detectado no Horto.</p>
                  <button className="mt-3 text-[10px] font-bold text-red-600 uppercase">Criar Ação</button>
                </div>

                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <TrendingUp size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Oportunidade</span>
                  </div>
                  <p className="text-xs font-bold text-brand-blue">Potencial Upgrade: Sócio Americano</p>
                  <p className="text-[11px] text-gray-500 mt-1">Torcedores com alta frequência no Independência.</p>
                  <button className="mt-3 text-[10px] font-bold text-blue-600 uppercase">Ver Lista</button>
                </div>
              </div>
            </aside>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
