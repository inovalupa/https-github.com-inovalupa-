
import React, { useState } from 'react';
import { Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

interface SystemUser {
  username: string;
  role: 'EXECUTIVE' | 'SCIENTIST' | 'MARKETING' | null;
  displayName: string;
}

interface LoginProps {
  onLogin: (role: 'EXECUTIVE' | 'SCIENTIST' | 'MARKETING', name: string) => void;
  LogoComponent: React.FC<{ className?: string }>;
  users: SystemUser[];
}

const Login: React.FC<LoginProps> = ({ onLogin, LogoComponent, users }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Normalize input for case-insensitive check
    const inputUser = username.trim().toLowerCase();
    
    // Verificação de senha simples para o MVP
    if (password !== '123456') {
      setError('Senha incorreta. Tente novamente.');
      return;
    }

    // Busca o usuário na lista fornecida via props (do App state)
    const foundUser = users.find(user => user.username === inputUser);

    if (foundUser && foundUser.role) {
      onLogin(foundUser.role, foundUser.displayName);
    } else {
      setError('Usuário não encontrado ou sem permissão de acesso.');
    }
  };

  return (
    <div className="min-h-screen bg-brand-blue flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-orange rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[120px]"></div>
      </div>

      <div className="z-10 w-full max-w-md animate-fade-in">
        <div className="flex justify-center mb-8">
          <LogoComponent className="h-20 w-auto" />
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-1 text-center">Acesso Restrito</h2>
          <p className="text-blue-200 text-sm text-center mb-6">Entre com suas credenciais corporativas.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-blue-200 mb-1 ml-1">Usuário</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg leading-5 bg-black/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange sm:text-sm transition-all"
                  placeholder="Nome do Usuário"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-blue-200 mb-1 ml-1">Senha</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-white/10 rounded-lg leading-5 bg-black/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-brand-orange sm:text-sm transition-all"
                  placeholder="••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-300 text-xs bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <AlertCircle size={14} />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-brand-orange hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange transition-all mt-6"
            >
              Entrar <ArrowRight size={16} className="ml-2" />
            </button>
          </form>
        </div>

        {/* Helper for Demo purposes */}
        <div className="mt-8 text-center">
           <p className="text-xs text-gray-500 mb-2">Credenciais Demo (Senha: 123456)</p>
           <div className="flex flex-wrap justify-center gap-2 text-[10px] text-gray-400">
              {users.map((u, i) => (
                <span key={i} className="bg-white/5 px-2 py-1 rounded capitalize">{u.username}</span>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
