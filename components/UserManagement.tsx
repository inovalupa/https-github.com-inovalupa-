
import React, { useState } from 'react';
import { UserPlus, Shield, Trash2, CheckCircle, User as UserIcon } from 'lucide-react';

interface SystemUser {
  username: string;
  role: 'EXECUTIVE' | 'SCIENTIST' | 'MARKETING';
  displayName: string;
}

interface UserManagementProps {
  users: SystemUser[];
  onAddUser: (user: SystemUser) => void;
  onRemoveUser: (username: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, onAddUser, onRemoveUser }) => {
  const [newUser, setNewUser] = useState({
    displayName: '',
    username: '',
    role: 'MARKETING' as 'EXECUTIVE' | 'SCIENTIST' | 'MARKETING'
  });
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUser.username || !newUser.displayName) return;

    // Basic duplicate check
    if (users.some(u => u.username === newUser.username)) {
      alert('Usuário já existe!');
      return;
    }

    onAddUser(newUser);
    setNewUser({ displayName: '', username: '', role: 'MARKETING' });
    setSuccessMsg('Usuário criado com sucesso!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'EXECUTIVE': return 'Diretoria Executiva (Full Access)';
      case 'SCIENTIST': return 'Engenharia de Dados (Sysadmin)';
      case 'MARKETING': return 'Marketing & Growth';
      default: return role;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-brand-blue">Gestão de Usuários e Permissões</h2>
          <p className="text-gray-500 text-sm">Controle quem tem acesso à plataforma Data Fan.</p>
        </div>
        <div className="bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-lg flex items-center gap-2">
           <Shield size={18} />
           <span className="font-semibold text-sm">Área Administrativa</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <UserPlus className="text-brand-orange" size={20} />
              Novo Usuário
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                <input
                  type="text"
                  value={newUser.displayName}
                  onChange={e => setNewUser({...newUser, displayName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                  placeholder="Ex: João Silva"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Login (Usuário)</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={e => setNewUser({...newUser, username: e.target.value.toLowerCase()})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                  placeholder="Ex: joao.silva"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">A senha padrão será: 123456</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Perfil de Acesso</label>
                <select
                  value={newUser.role}
                  onChange={e => setNewUser({...newUser, role: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-blue outline-none bg-white"
                >
                  <option value="MARKETING">Marketing (Campanhas e Chat)</option>
                  <option value="SCIENTIST">Eng. Dados (Sysadmin/Cloudera)</option>
                  <option value="EXECUTIVE">Executivo (Visão Geral)</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-blue text-white py-3 rounded-lg font-medium hover:bg-blue-900 transition-colors shadow-lg shadow-brand-blue/20"
              >
                Cadastrar Usuário
              </button>
            </form>

            {successMsg && (
              <div className="mt-4 p-3 bg-green-50 text-green-700 rounded-lg flex items-center gap-2 text-sm border border-green-200 animate-fade-in">
                <CheckCircle size={16} />
                {successMsg}
              </div>
            )}
          </div>
        </div>

        {/* List Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-800">Usuários Ativos</h3>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-white border-b border-gray-100 text-xs uppercase text-gray-400 font-semibold tracking-wider">
                  <th className="px-6 py-4">Usuário</th>
                  <th className="px-6 py-4">Perfil</th>
                  <th className="px-6 py-4 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.map((user) => (
                  <tr key={user.username} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-gray-100 p-2 rounded-full">
                          <UserIcon size={16} className="text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.displayName}</p>
                          <p className="text-xs text-gray-500">@{user.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${
                        user.role === 'EXECUTIVE' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                        user.role === 'SCIENTIST' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                        'bg-orange-50 text-orange-700 border-orange-100'
                      }`}>
                        {getRoleLabel(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {user.username !== 'sysadmin' && (
                        <button 
                          onClick={() => onRemoveUser(user.username)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          title="Remover acesso"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
